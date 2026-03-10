package br.com.davez.api.service;

import br.com.davez.api.exceptions.ResourceNotFoundException;
import br.com.davez.api.exceptions.UnauthorizedAccessException;
import br.com.davez.api.exceptions.ValidationException;
import br.com.davez.api.model.dto.schedule.ScheduleRequestDTO;
import br.com.davez.api.model.dto.schedule.ScheduleResponseDTO;
import br.com.davez.api.model.dto.schedule.ScheduleTransitionDTO;
import br.com.davez.api.model.entity.*;
import br.com.davez.api.model.enums.QueueStatus;
import br.com.davez.api.model.enums.Role;
import br.com.davez.api.repository.*;
import br.com.davez.api.utils.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final BranchRepository branchRepository;
    private final UserRepository userRepository;
    private final CarrierRepository carrierRepository;
    private final SecurityUtils securityUtils;
    private final ScheduleHistoryRepository historyRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, BranchRepository branchRepository,
            UserRepository userRepository, CarrierRepository carrierRepository, SecurityUtils securityUtils,
            ScheduleHistoryRepository historyRepository) {
        this.scheduleRepository = scheduleRepository;
        this.branchRepository = branchRepository;
        this.userRepository = userRepository;
        this.carrierRepository = carrierRepository;
        this.securityUtils = securityUtils;
        this.historyRepository = historyRepository;
    }

    @Transactional
    public ScheduleResponseDTO create(ScheduleRequestDTO dto) {
        User loggedUser = securityUtils.getLoggedUser();
        Role userRole = loggedUser.getRole();

        User driver = getScheduleDriver(loggedUser, dto);

        Branch branch = switch (userRole) {
            case MANAGER, SCALE_OPERATOR, GATE_KEEPER -> validateInternalScopeAndGetBranch(loggedUser, dto);
            default -> getBranch(dto.branchCode());
        };

        Carrier carrier = null;
        if (userRole == Role.CARRIER) {
            carrier = loggedUser.getCarrier();
        } else {
            String carrierCnpj = dto.carrierCnpj() != null ? dto.carrierCnpj()
                    : (driver.getCarrier() != null ? driver.getCarrier().getCnpj() : null);
            carrier = (carrierCnpj != null) ? getCarrierByCnpj(carrierCnpj) : null;
        }

        Schedule schedule = mapToSchedule(dto, branch, driver, carrier);

        Integer nextQueuePosition = scheduleRepository.findMaxQueuePosition(branch.getId())
                .map(maxPos -> maxPos + 1)
                .orElse(1);

        schedule.setQueuePosition(nextQueuePosition);
        schedule.setTicketCode(generateUniqueTicketCode());

        Schedule savedSchedule = scheduleRepository.save(schedule);
        log.info("Agendamento criado com sucesso: Ticket [{}] para o motorista [{}] na filial [{}]",
                savedSchedule.getTicketCode(), savedSchedule.getDriver().getName(), branch.getName());
        registerHistory(savedSchedule, null, QueueStatus.SCHEDULED, loggedUser);
        return toResponseDTO(savedSchedule);
    }

    @Transactional(readOnly = true)
    public ScheduleResponseDTO findActiveByLoggedDriver() {
        User loggedUser = securityUtils.getLoggedUser();
        if (loggedUser.getRole() != Role.DRIVER) {
            throw new UnauthorizedAccessException("Somente motoristas podem acessar este recurso.");
        }

        Schedule schedule = scheduleRepository.findFirstByDriver_IdAndQueueStatusIn(
                loggedUser.getId(),
                List.of(QueueStatus.SCHEDULED, QueueStatus.IN_SERVICE))
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento ativo", "motorista", loggedUser.getUsername()));

        return toResponseDTO(schedule);
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDTO> findHistoryByLoggedDriver() {
        User loggedUser = securityUtils.getLoggedUser();
        if (loggedUser.getRole() != Role.DRIVER) {
            throw new UnauthorizedAccessException("Somente motoristas podem acessar este recurso.");
        }

        return scheduleRepository.findByDriverId(loggedUser.getId()).stream()
                .filter(s -> s.getQueueStatus() == QueueStatus.COMPLETED || s.getQueueStatus() == QueueStatus.CANCELED)
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDTO> findAll() {
        User loggedUser = securityUtils.getLoggedUser();
        List<Schedule> schedules;

        if (loggedUser.getRole() == Role.ADMIN) {
            schedules = scheduleRepository.findAll();

        } else if (loggedUser.getRole() == Role.MANAGER ||
                loggedUser.getRole() == Role.SCALE_OPERATOR ||
                loggedUser.getRole() == Role.GATE_KEEPER) {

            if (loggedUser.getCompany() == null)
                return List.of();
            schedules = scheduleRepository.findByBranch_Company_Cnpj(loggedUser.getCompany().getCnpj());

        } else if (loggedUser.getRole() == Role.CARRIER) {
            if (loggedUser.getCarrier() == null)
                return List.of();
            schedules = scheduleRepository.findByCarrierCnpj(loggedUser.getCarrier().getCnpj());

        } else if (loggedUser.getRole() == Role.DRIVER) {
            schedules = scheduleRepository.findByDriverId(loggedUser.getId());

        } else {
            throw new UnauthorizedAccessException("Usuário não autorizado a visualizar a lista de agendamentos.");
        }

        return schedules.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ScheduleResponseDTO findByTicketCode(String ticketCode) {
        Schedule schedule = scheduleRepository.findByTicketCode(ticketCode)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "ticketCode", ticketCode));

        User loggedUser = securityUtils.getLoggedUser();
        Role userRole = loggedUser.getRole();

        if (userRole != Role.ADMIN) {

            boolean allowed = false;

            if ((userRole == Role.MANAGER || userRole == Role.SCALE_OPERATOR || userRole == Role.GATE_KEEPER)
                    && loggedUser.getCompany() != null) {
                if (schedule.getBranch().getCompany().getCnpj().equals(loggedUser.getCompany().getCnpj())) {
                    allowed = true;
                }
            } else if (userRole == Role.CARRIER && loggedUser.getCarrier() != null) {
                if (schedule.getCarrier() != null
                        && schedule.getCarrier().getCnpj().equals(loggedUser.getCarrier().getCnpj())) {
                    allowed = true;
                }
            } else if (userRole == Role.DRIVER) {
                if (schedule.getDriver().getId().equals(loggedUser.getId())) {
                    allowed = true;
                }
            }

            if (!allowed) {
                throw new UnauthorizedAccessException("Você não tem permissão para visualizar este agendamento.");
            }
        }

        return toResponseDTO(schedule);
    }

    @Transactional
    public void moveToInService(ScheduleTransitionDTO transition) {
        User loggedUser = securityUtils.getLoggedUser();
        Role userRole = loggedUser.getRole();

        if (userRole != Role.ADMIN && userRole != Role.MANAGER && userRole != Role.SCALE_OPERATOR) {
            throw new UnauthorizedAccessException(
                    "Somente usuários ADMIN, MANAGER ou SCALE_OPERATOR podem mover agendamentos para IN_SERVICE.");
        }

        Schedule schedule = findActiveScheduleByPlateAndBranch(transition, loggedUser);

        if (schedule.getQueueStatus() != QueueStatus.SCHEDULED) {
            throw new ValidationException(String.format(
                    "O agendamento da placa %s não está no status SCHEDULED, mas sim em %s. Não pode ser movido para IN_SERVICE.",
                    transition.licensePlate(), schedule.getQueueStatus().name()));
        }

        QueueStatus oldStatus = schedule.getQueueStatus();
        Integer oldQueuePosition = schedule.getQueuePosition();

        schedule.setQueueStatus(QueueStatus.IN_SERVICE);
        schedule.setCalledAt(LocalDateTime.now());
        schedule.setQueuePosition(null);

        scheduleRepository.save(schedule);
        log.info("Agendamento [{}] movido para IN_SERVICE por [{}]", schedule.getTicketCode(),
                loggedUser.getUsername());

        if (oldQueuePosition != null) {
            scheduleRepository.reorderQueuePositions(schedule.getBranch().getId(), oldQueuePosition);
        }

        registerHistory(schedule, oldStatus, QueueStatus.IN_SERVICE, loggedUser);
    }

    @Transactional
    public void moveToCompleted(ScheduleTransitionDTO transition) {
        User loggedUser = securityUtils.getLoggedUser();
        Role userRole = loggedUser.getRole();

        if (userRole != Role.ADMIN && userRole != Role.MANAGER && userRole != Role.SCALE_OPERATOR) {
            throw new UnauthorizedAccessException(
                    "Somente usuários ADMIN, MANAGER ou SCALE_OPERATOR podem marcar agendamentos como COMPLETED.");
        }

        Schedule schedule = findActiveScheduleByPlateAndBranch(transition, loggedUser);

        if (schedule.getQueueStatus() != QueueStatus.IN_SERVICE) {
            throw new ValidationException(String.format(
                    "O agendamento da placa %s não está no status IN_SERVICE, mas sim em %s. Não pode ser movido para COMPLETED.",
                    transition.licensePlate(), schedule.getQueueStatus().name()));
        }

        QueueStatus oldStatus = schedule.getQueueStatus();

        schedule.setQueueStatus(QueueStatus.COMPLETED);
        schedule.setReleasedAt(LocalDateTime.now());

        scheduleRepository.save(schedule);
        log.info("Agendamento [{}] concluído com sucesso por [{}]", schedule.getTicketCode(), loggedUser.getUsername());

        registerHistory(schedule, oldStatus, QueueStatus.IN_SERVICE, loggedUser);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getOperatorStats() {
        User loggedUser = securityUtils.getLoggedUser();
        List<Schedule> schedules;

        if (loggedUser.getBranch() != null) {
            schedules = scheduleRepository.findByBranchId(loggedUser.getBranch().getId());
        } else if (loggedUser.getCompany() != null) {
            schedules = scheduleRepository.findByBranch_Company_Cnpj(loggedUser.getCompany().getCnpj());
        } else {
            return Map.of("waiting", 0, "inService", 0, "completedToday", 0);
        }

        long waiting = schedules.stream().filter(s -> s.getQueueStatus() == QueueStatus.SCHEDULED).count();
        long inService = schedules.stream().filter(s -> s.getQueueStatus() == QueueStatus.IN_SERVICE).count();
        long completedToday = schedules.stream()
                .filter(s -> s.getQueueStatus() == QueueStatus.COMPLETED
                        && s.getReleasedAt() != null
                        && s.getReleasedAt().toLocalDate().equals(LocalDateTime.now().toLocalDate()))
                .count();

        return Map.of(
                "waiting", waiting,
                "inService", inService,
                "completedToday", completedToday);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getCarrierStats() {
        User loggedUser = securityUtils.getLoggedUser();
        if (loggedUser.getCarrier() == null)
            return Map.of();

        String carrierCnpj = loggedUser.getCarrier().getCnpj();
        List<Schedule> carrierSchedules = scheduleRepository.findByCarrierCnpj(carrierCnpj);

        long active = carrierSchedules.stream().filter(
                s -> s.getQueueStatus() == QueueStatus.SCHEDULED || s.getQueueStatus() == QueueStatus.IN_SERVICE)
                .count();
        long completedTotal = carrierSchedules.stream().filter(s -> s.getQueueStatus() == QueueStatus.COMPLETED)
                .count();

        return Map.of(
                "activeAppointments", active,
                "completedTotal", completedTotal);
    }

    @Transactional
    public void notifyDriver(String ticketCode) {
        // Lógica de notificação (ex: WebSocket ou Push) seria implementada aqui.
        log.info("Notificando motorista do agendamento Ticket: [{}]", ticketCode);
    }

    @Transactional
    public void startServiceByTicketCode(String ticketCode) {
        Schedule schedule = scheduleRepository.findByTicketCode(ticketCode)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "ticketCode", ticketCode));

        User loggedUser = securityUtils.getLoggedUser();
        validateScope(schedule, loggedUser);

        if (schedule.getQueueStatus() != QueueStatus.SCHEDULED) {
            throw new ValidationException("Agendamento não está em espera (SCHEDULED).");
        }

        QueueStatus oldStatus = schedule.getQueueStatus();
        schedule.setQueueStatus(QueueStatus.IN_SERVICE);
        schedule.setCalledAt(LocalDateTime.now());
        scheduleRepository.save(schedule);

        registerHistory(schedule, oldStatus, QueueStatus.IN_SERVICE, loggedUser);
    }

    @Transactional
    public void completeServiceByTicketCode(String ticketCode) {
        Schedule schedule = scheduleRepository.findByTicketCode(ticketCode)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "ticketCode", ticketCode));

        User loggedUser = securityUtils.getLoggedUser();
        validateScope(schedule, loggedUser);

        if (schedule.getQueueStatus() != QueueStatus.IN_SERVICE) {
            throw new ValidationException("Agendamento não está em atendimento (IN_SERVICE).");
        }

        QueueStatus oldStatus = schedule.getQueueStatus();
        schedule.setQueueStatus(QueueStatus.COMPLETED);
        schedule.setReleasedAt(LocalDateTime.now());
        scheduleRepository.save(schedule);
        log.info("Agendamento [{}] concluído com sucesso por [{}]", schedule.getTicketCode(), loggedUser.getUsername());

        registerHistory(schedule, oldStatus, QueueStatus.COMPLETED, loggedUser);
    }

    private void validateScope(Schedule schedule, User loggedUser) {
        if (loggedUser.getRole() == Role.ADMIN)
            return;
        if (loggedUser.getCompany() != null
                && schedule.getBranch().getCompany().getCnpj().equals(loggedUser.getCompany().getCnpj()))
            return;
        throw new UnauthorizedAccessException("Você não tem permissão para operar este agendamento.");
    }

    @Transactional
    public void cancel(ScheduleTransitionDTO transition) {
        User loggedUser = securityUtils.getLoggedUser();
        Role userRole = loggedUser.getRole();

        if (userRole == Role.CARRIER) {
            throw new UnauthorizedAccessException("Usuários CARRIER não têm permissão para cancelar agendamentos.");
        }

        Schedule schedule = findActiveScheduleByPlateAndBranch(transition, loggedUser);

        if (userRole == Role.DRIVER && !schedule.getDriver().getId().equals(loggedUser.getId())) {
            throw new UnauthorizedAccessException(
                    "Você não tem permissão para cancelar agendamentos de outros motoristas.");
        }

        if (schedule.getQueueStatus() == QueueStatus.COMPLETED || schedule.getQueueStatus() == QueueStatus.CANCELED) {
            throw new ValidationException(String.format(
                    "O agendamento da placa %s está em %s e não pode ser cancelado.",
                    transition.licensePlate(), schedule.getQueueStatus().name()));
        }

        Integer oldQueuePosition = schedule.getQueuePosition();
        QueueStatus oldStatus = schedule.getQueueStatus();

        schedule.setQueueStatus(QueueStatus.CANCELED);
        schedule.setQueuePosition(null);

        scheduleRepository.save(schedule);
        log.warn("Agendamento [{}] CANCELADO por [{}]", schedule.getTicketCode(), loggedUser.getUsername());

        if (oldQueuePosition != null) {
            scheduleRepository.reorderQueuePositions(schedule.getBranch().getId(), oldQueuePosition);
        }

        registerHistory(schedule, oldStatus, QueueStatus.CANCELED, loggedUser);
    }

    @Transactional
    public void deleteByTicketCode(String ticketCode) {
        User loggedUser = securityUtils.getLoggedUser();

        if (loggedUser.getRole() != Role.ADMIN) {
            throw new UnauthorizedAccessException("Somente usuários ADMIN podem excluir agendamentos permanentemente.");
        }

        Schedule schedule = scheduleRepository.findByTicketCode(ticketCode)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule", "ticketCode", ticketCode));

        if (schedule.getQueueStatus() == QueueStatus.SCHEDULED && schedule.getQueuePosition() != null) {
            scheduleRepository.reorderQueuePositions(schedule.getBranch().getId(), schedule.getQueuePosition());
        }

        scheduleRepository.delete(schedule);
    }

    private User getScheduleDriver(User loggedUser, ScheduleRequestDTO dto) {

        if (loggedUser.getRole() == Role.DRIVER) {
            return loggedUser;

        } else {
            if (dto.driverCpf() == null) {
                throw new ValidationException(
                        "O CPF do motorista é obrigatório para agendamentos não feitos por um motorista logado.");
            }

            User driver = userRepository.findByCpf(dto.driverCpf())
                    .orElseThrow(() -> new ResourceNotFoundException("Motorista ", "cpf", dto.driverCpf()));

            if (driver.getRole() != Role.DRIVER) {
                throw new ValidationException("O CPF " + dto.driverCpf() + " não está vinculado a um motorista.");
            }
            return driver;
        }
    }

    private Schedule findActiveScheduleByPlateAndBranch(ScheduleTransitionDTO transition, User loggedUser) {
        Schedule schedule = scheduleRepository.findLatestActiveByPlateAndBranch(
                transition.licensePlate().toUpperCase().trim(),
                transition.branchName()).orElseThrow(
                        () -> new ResourceNotFoundException(
                                String.format("Nenhum agendamento ativo encontrado para a placa %s na filial %s.",
                                        transition.licensePlate(), transition.branchName())));

        if (loggedUser.getRole() != Role.ADMIN) {
            if (loggedUser.getCompany() != null) {
                if (!schedule.getBranch().getCompany().getCnpj().equals(loggedUser.getCompany().getCnpj())) {
                    throw new UnauthorizedAccessException(
                            "Você não tem permissão para operar agendamentos de outra empresa.");
                }
            }
        }

        return schedule;
    }

    private Branch validateInternalScopeAndGetBranch(User loggedUser, ScheduleRequestDTO dto) {
        if (loggedUser.getCompany() == null) {
            throw new ValidationException("Usuário interno não vinculado a uma Empresa. Agendamento não permitido.");
        }
        if (dto.branchCode() == null)
            throw new ValidationException("O Código da Filial é obrigatório.");

        Branch branch = branchRepository.findByCode(dto.branchCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Branch", "code", dto.branchCode()));

        if (!branch.getCompany().getCnpj().equals(loggedUser.getCompany().getCnpj())) {
            throw new ValidationException(
                    String.format("%s não tem permissão para agendar em filiais fora da sua empresa (%s).",
                            loggedUser.getRole().name(), loggedUser.getCompany().getName()));
        }
        return branch;
    }

    private Branch getBranch(String branchCode) {
        if (branchCode == null)
            throw new ValidationException("O Código da Filial é obrigatório.");
        
        return branchRepository.findByCode(branchCode)
                .orElseThrow(() -> new ResourceNotFoundException("Branch", "code", branchCode));
    }

    private Carrier getCarrierByCnpj(String cnpj) {
        return carrierRepository.findByCnpj(cnpj)
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "cnpj", cnpj));
    }

    private Schedule mapToSchedule(ScheduleRequestDTO dto, Branch branch, User driver, Carrier carrier) {
        Schedule schedule = new Schedule();
        schedule.setBranch(branch);
        schedule.setDriver(driver);
        schedule.setCarrier(carrier);

        schedule.setGrainType(dto.grainType());
        schedule.setOperationType(dto.operationType());
        schedule.setLicensePlate(dto.licensePlate().toUpperCase().trim());
        schedule.setTruckType(dto.truckType());

        schedule.setQueueStatus(QueueStatus.SCHEDULED);
        schedule.setQueuePosition(null);

        return schedule;
    }

    private String generateUniqueTicketCode() {
        String ticketCode;
        boolean exists;
        do {
            ticketCode = "DVZ-"
                    + java.util.UUID.randomUUID().toString().substring(0, 12).toUpperCase().replace("-", "X");
            exists = scheduleRepository.findByTicketCode(ticketCode).isPresent();
        } while (exists);
        return ticketCode;
    }

    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void cleanOldSchedules() {
        LocalDateTime limitDate = LocalDateTime.now().minusDays(30);
        List<Schedule> oldSchedules = scheduleRepository.findAllByCreatedAtBefore(limitDate);

        if (!oldSchedules.isEmpty()) {
            scheduleRepository.deleteAll(oldSchedules);
            log.info("Limpeza de Banco: {} agendamentos com mais de 30 dias foram removidos com sucesso.",
                    oldSchedules.size());
        } else {
            log.debug("Limpeza de Banco: Nenhum agendamento antigo encontrado para remoção.");
        }
    }

    private ScheduleResponseDTO toResponseDTO(Schedule schedule) {
        return new ScheduleResponseDTO(
                schedule.getTicketCode(),
                schedule.getBranch().getCode(),
                schedule.getBranch().getName(),
                schedule.getDriver().getCpf(),
                schedule.getDriver().getName(),
                schedule.getCarrier() != null ? schedule.getCarrier().getCnpj() : null,
                schedule.getCarrier() != null ? schedule.getCarrier().getName() : "Autônomo / Não Informado",
                schedule.getGrainType(),
                schedule.getOperationType(),
                schedule.getLicensePlate(),
                schedule.getTruckType(),
                schedule.getQueueStatus(),
                schedule.getQueuePosition(),
                schedule.getCreatedAt(),
                schedule.getCalledAt(),
                schedule.getReleasedAt());
    }

    private void registerHistory(Schedule schedule, QueueStatus oldStatus, QueueStatus newStatus, User user) {
        if (oldStatus != newStatus) {
            ScheduleHistory history = new ScheduleHistory(schedule, oldStatus, newStatus, user);
            historyRepository.save(history);
        }
    }
}