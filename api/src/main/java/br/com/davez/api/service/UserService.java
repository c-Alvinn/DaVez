package br.com.davez.api.service;

import br.com.davez.api.exceptions.ResourceNotFoundException;
import br.com.davez.api.exceptions.UnauthorizedAccessException;
import br.com.davez.api.exceptions.ValidationException;
import br.com.davez.api.model.dto.user.RegisterCarrierUserRequestDTO;
import br.com.davez.api.model.dto.user.RegisterDriverRequestDTO;
import br.com.davez.api.model.dto.user.RegisterInternalUserRequestDTO;
import br.com.davez.api.model.dto.user.UserResponseDTO;
import br.com.davez.api.model.entity.Branch;
import br.com.davez.api.model.entity.Carrier;
import br.com.davez.api.model.entity.Company;
import br.com.davez.api.model.entity.User;
import br.com.davez.api.model.enums.Role;
import br.com.davez.api.repository.BranchRepository;
import br.com.davez.api.repository.CarrierRepository;
import br.com.davez.api.repository.CompanyRepository;
import br.com.davez.api.repository.UserRepository;
import br.com.davez.api.utils.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BranchRepository branchRepository;
    private final CompanyRepository companyRepository;
    private final SecurityUtils securityUtils;
    private final CarrierRepository carrierRepository;

    private static final Set<Role> INTERNAL_ROLES = Set.of(
            Role.MANAGER,
            Role.GATE_KEEPER,
            Role.SCALE_OPERATOR);

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            BranchRepository branchRepository, CompanyRepository companyRepository, SecurityUtils securityUtils,
            CarrierRepository carrierRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.branchRepository = branchRepository;
        this.companyRepository = companyRepository;
        this.securityUtils = securityUtils;
        this.carrierRepository = carrierRepository;
    }

    @Transactional
    public void registerDriver(RegisterDriverRequestDTO data) {
        if (userRepository.existsByCpf(data.cpf())) {
            throw new ValidationException("O CPF " + data.cpf() + " já está cadastrado.");
        }

        User newDriver = new User();
        newDriver.setName(data.name());
        newDriver.setCpf(data.cpf());
        newDriver.setPhoneNumber(data.phoneNumber());
        newDriver.setRole(Role.DRIVER);
        String hashedPassword = passwordEncoder.encode(data.password());
        newDriver.setPassword(hashedPassword);

        userRepository.save(newDriver);
        log.info("Novo motorista registrado com sucesso: CPF [{}]", data.cpf());
    }

    @Transactional
    public void registerInternalUser(RegisterInternalUserRequestDTO data) {
        User loggedUser = securityUtils.getLoggedUser();

        if (loggedUser.getRole() != Role.ADMIN) {
            if (loggedUser.getCompany() == null) {
                throw new UnauthorizedAccessException("Usuário interno sem vínculo de empresa. Contate o suporte.");
            }

            if (!loggedUser.getCompany().getCnpj().equals(data.companyCnpj())) {
                throw new ValidationException(
                        "Não é permitido cadastrar usuários fora do escopo da sua empresa. " +
                                "Você está vinculado à empresa: " + loggedUser.getCompany().getName());
            }
        }

        if (!INTERNAL_ROLES.contains(data.role())) {
            throw new ValidationException("Não é permitido cadastrar a Role " + data.role() + " por esta API.");
        }

        if (userRepository.existsByUsername(data.username())) {
            throw new ValidationException("O nome de usuário '" + data.username() + "' já está em uso.");
        }

        Company company = companyRepository.findByCnpj(data.companyCnpj())
                .orElseThrow(() -> new ResourceNotFoundException("Company", "cnpj", data.companyCnpj()));

        Branch branch = branchRepository.findByCode(data.branchCode())
                .orElseThrow(() -> new ResourceNotFoundException("Branch", "code", data.branchCode()));

        User newUser = new User();
        newUser.setName(data.name());
        newUser.setUsername(data.username());
        newUser.setRole(data.role());
        newUser.setCompany(company);
        newUser.setBranch(branch);

        String hashedPassword = passwordEncoder.encode(data.password());
        newUser.setPassword(hashedPassword);

        userRepository.save(newUser);
    }

    @Transactional
    public void registerCarrierUser(RegisterCarrierUserRequestDTO data) {
        User loggedUser = securityUtils.getLoggedUser();

        if (loggedUser.getRole() != Role.ADMIN) {
            if (loggedUser.getRole() != Role.CARRIER || loggedUser.getCarrier() == null) {
                throw new UnauthorizedAccessException(
                        "Usuário sem permissão de Administrador Global ou sem vínculo com Transportadora.");
            }

            if (!loggedUser.getCarrier().getCnpj().equals(data.carrierCnpj())) {
                throw new ValidationException(
                        "Não é permitido cadastrar usuários para outras transportadoras. " +
                                "Você está vinculado à transportadora " + loggedUser.getCarrier().getName());
            }
        }

        if (userRepository.existsByUsername(data.username())) {
            throw new ValidationException("O nome de usuário '" + data.username() + "' já está em uso.");
        }

        Carrier carrier = carrierRepository.findByCnpj(data.carrierCnpj())
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "cnpj", data.carrierCnpj()));

        User newUser = new User();
        newUser.setName(data.name());
        newUser.setUsername(data.username());
        newUser.setRole(Role.CARRIER);
        newUser.setCpf(null);
        newUser.setCompany(null);
        newUser.setBranch(null);
        newUser.setCarrier(carrier);

        String hashedPassword = passwordEncoder.encode(data.password());
        newUser.setPassword(hashedPassword);

        userRepository.save(newUser);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getLoggedUserProfile() {
        User loggedUser = securityUtils.getLoggedUser();
        return toResponseDTO(loggedUser);
    }

    @Transactional
    public void changePassword(String newPassword) {
        User loggedUser = securityUtils.getLoggedUser();
        loggedUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(loggedUser);
    }

    @Transactional(readOnly = true)
    public User findByCpf(String cpf) {
        return userRepository.findByCpf(cpf)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário", "cpf", cpf));
    }

    private UserResponseDTO toResponseDTO(User user) {
        return new UserResponseDTO(
                user.getName(),
                user.getUsername(),
                user.getCpf(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getCompany() != null ? user.getCompany().getCnpj() : null,
                user.getCompany() != null ? user.getCompany().getName() : null,
                user.getBranch() != null ? user.getBranch().getCode() : null,
                user.getBranch() != null ? user.getBranch().getName() : null,
                user.getCarrier() != null ? user.getCarrier().getCnpj() : null,
                user.getCarrier() != null ? user.getCarrier().getName() : null
        );
    }
}