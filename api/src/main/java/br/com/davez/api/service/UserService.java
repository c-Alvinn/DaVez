package br.com.davez.api.service;

import br.com.davez.api.exceptions.ResourceNotFoundException;
import br.com.davez.api.exceptions.UnauthorizedAccessException;
import br.com.davez.api.exceptions.ValidationException;
import br.com.davez.api.model.dto.user.RegisterCarrierUserRequestDTO;
import br.com.davez.api.model.dto.user.RegisterDriverRequestDTO;
import br.com.davez.api.model.dto.user.RegisterInternalUserRequestDTO;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
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
            Role.SCALE_OPERATOR
    );

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, BranchRepository branchRepository, CompanyRepository companyRepository, SecurityUtils securityUtils, CarrierRepository carrierRepository) {
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
    }

    @Transactional
    public void registerInternalUser(RegisterInternalUserRequestDTO data) {

        User loggedUser = securityUtils.getLoggedUser();

        if (loggedUser.getRole() != Role.ADMIN) {

            if (loggedUser.getCompany() == null) {
                throw new UnauthorizedAccessException("Usuário interno sem vínculo de empresa. Contate o suporte.");
            }

            if (!loggedUser.getCompany().getId().equals(data.companyId())) {
                throw new ValidationException(
                        "Não é permitido cadastrar usuários fora do escopo da sua empresa. " +
                                "Você está vinculado à empresa: " + loggedUser.getCompany().getName()
                );
            }
        }

        if (!INTERNAL_ROLES.contains(data.role())) {
            throw new ValidationException("Não é permitido cadastrar a Role " + data.role() + " por esta API.");
        }

        if (userRepository.existsByUsername(data.username())) {
            throw new ValidationException("O nome de usuário '" + data.username() + "' já está em uso.");
        }
        if (data.cpf() != null && !data.cpf().isEmpty() && userRepository.existsByCpf(data.cpf())) {
            throw new ValidationException("O CPF informado já está cadastrado.");
        }

        Company company = companyRepository.findById(data.companyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", data.companyId()));

        Branch branch = branchRepository.findById(data.branchId())
                .orElseThrow(() -> new ResourceNotFoundException("Branch", "id", data.branchId()));

        User newUser = new User();
        newUser.setName(data.name());
        newUser.setUsername(data.username());
        newUser.setCpf(data.cpf());
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
                throw new UnauthorizedAccessException("Usuário sem permissão de Administrador Global ou sem vínculo com Transportadora.");
            }

            if (!loggedUser.getCarrier().getId().equals(data.carrierId())) {
                throw new ValidationException(
                        "Não é permitido cadastrar usuários para outras transportadoras. " +
                                "Você está vinculado à transportadora " + loggedUser.getCarrier().getName()
                );
            }
        }

        if (userRepository.existsByUsername(data.username())) {
            throw new ValidationException("O nome de usuário '" + data.username() + "' já está em uso.");
        }

        Carrier carrier = carrierRepository.findById(data.carrierId())
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "id", data.carrierId()));

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
}