package br.com.davez.api.service;

import br.com.davez.api.exceptions.ResourceNotFoundException;
import br.com.davez.api.exceptions.UnauthorizedAccessException;
import br.com.davez.api.model.dto.report.QueueStatusReportDTO;
import br.com.davez.api.model.entity.Branch;
import br.com.davez.api.model.entity.Schedule;
import br.com.davez.api.model.entity.User;
import br.com.davez.api.model.enums.QueueStatus;
import br.com.davez.api.model.enums.ReportPeriod;
import br.com.davez.api.model.enums.Role;
import br.com.davez.api.repository.BranchRepository;
import br.com.davez.api.repository.ScheduleRepository;
import br.com.davez.api.utils.PdfReportGenerator;
import br.com.davez.api.utils.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class ReportingService {

    private final ScheduleRepository scheduleRepository;
    private final BranchRepository branchRepository;
    private final SecurityUtils securityUtils;

    public ReportingService(ScheduleRepository scheduleRepository, BranchRepository branchRepository, SecurityUtils securityUtils) {
        this.scheduleRepository = scheduleRepository;
        this.branchRepository = branchRepository;
        this.securityUtils = securityUtils;
    }

    @Transactional(readOnly = true)
    public QueueStatusReportDTO getQueueStatusReport(String branchCode) {
        User loggedUser = securityUtils.getLoggedUser();

        Branch branch = branchRepository.findByCode(branchCode)
                .orElseThrow(() -> new ResourceNotFoundException("Branch", "code", branchCode));

        if (loggedUser.getRole() != Role.ADMIN) {
            if (loggedUser.getCompany() == null ||
                    !branch.getCompany().getCnpj().equals(loggedUser.getCompany().getCnpj())) {
                throw new UnauthorizedAccessException("Você não tem permissão para visualizar relatórios desta filial.");
            }
        }

        long scheduled = scheduleRepository.countByBranchIdAndQueueStatus(branch.getId(), QueueStatus.SCHEDULED);
        long inService = scheduleRepository.countByBranchIdAndQueueStatus(branch.getId(), QueueStatus.IN_SERVICE);
        long completed = scheduleRepository.countByBranchIdAndQueueStatus(branch.getId(), QueueStatus.COMPLETED);
        long canceled = scheduleRepository.countByBranchIdAndQueueStatus(branch.getId(), QueueStatus.CANCELED);

        return new QueueStatusReportDTO(
                branch.getCode(),
                branch.getName(),
                scheduled,
                inService,
                completed,
                canceled,
                (scheduled + inService)
        );
    }

    public void generatePerformanceReport(ReportPeriod period, HttpServletResponse response) throws Exception {
        User loggedUser = securityUtils.getLoggedUser();

        if (loggedUser.getCompany() == null) {
            throw new UnauthorizedAccessException("Usuário sem empresa vinculada.");
        }

        List<QueueStatus> statuses = List.of(QueueStatus.IN_SERVICE, QueueStatus.COMPLETED);

        // findReportData ainda usa ID interno para busca otimizada no banco, o que é aceitável internamente no Service.
        List<Schedule> data = scheduleRepository.findReportData(
                loggedUser.getCompany().getId(),
                statuses,
                period.getStart(),
                period.getEnd()
        );

        PdfReportGenerator.generateSchedulesPdf(
                response,
                data,
                loggedUser.getCompany().getName(),
                period.getLabel()
        );
        log.info("Relatório de desempenho gerado: Período [{}] por [{}]", period.getLabel(), loggedUser.getUsername());
    }
}