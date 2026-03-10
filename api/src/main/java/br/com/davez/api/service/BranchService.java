package br.com.davez.api.service;

import br.com.davez.api.model.dto.branch.BranchRequestDTO;
import br.com.davez.api.model.dto.branch.BranchResponseDTO;
import br.com.davez.api.model.dto.master.BranchMasterDTO;
import br.com.davez.api.exceptions.ResourceNotFoundException;
import br.com.davez.api.exceptions.ValidationException;
import br.com.davez.api.exceptions.UnauthorizedAccessException;
import br.com.davez.api.model.entity.Branch;
import br.com.davez.api.model.entity.Company;
import br.com.davez.api.model.entity.User;
import br.com.davez.api.repository.BranchRepository;
import br.com.davez.api.repository.CompanyRepository;
import br.com.davez.api.utils.SecurityUtils;
import br.com.davez.api.model.enums.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BranchService {

    private final BranchRepository branchRepository;
    private final CompanyRepository companyRepository;
    private final SecurityUtils securityUtils;

    public BranchService(
            BranchRepository branchRepository,
            CompanyRepository companyRepository,
            SecurityUtils securityUtils) {
        this.branchRepository = branchRepository;
        this.companyRepository = companyRepository;
        this.securityUtils = securityUtils;
    }

    private void validateInternalScopeAndGetBranch(String companyCnpj, String action) {
        User loggedUser = securityUtils.getLoggedUser();

        if (loggedUser.getRole() != Role.ADMIN) {
            if (loggedUser.getCompany() == null || !loggedUser.getCompany().getCnpj().equals(companyCnpj)) {
                log.warn("Tentativa de acesso não autorizado: Usuário [{}] da Empresa [{}] tentou {} dados da Empresa [{}]",
                        loggedUser.getUsername(),
                        loggedUser.getCompany() != null ? loggedUser.getCompany().getCnpj() : "N/A",
                        action,
                        companyCnpj);

                throw new ValidationException(
                        String.format("Usuário (%s) sem permissão para %s filiais fora do escopo da sua empresa.",
                                loggedUser.getRole().name(), action));
            }
        }
    }

    @Transactional
    public BranchResponseDTO create(BranchRequestDTO dto) {
        Company company = companyRepository.findByCnpj(dto.companyCnpj())
                .orElseThrow(() -> new ResourceNotFoundException("Company", "cnpj", dto.companyCnpj()));

        validateInternalScopeAndGetBranch(company.getCnpj(), "cadastrar");

        if (branchRepository.existsByCode(dto.branchCode())) {
            throw new ValidationException("O código de filial '" + dto.branchCode() + "' já está em uso.");
        }

        Branch branch = new Branch();
        branch.setName(dto.name());
        branch.setAddress(dto.address());
        branch.setCode(dto.branchCode());
        branch.setCompany(company);

        Branch savedBranch = branchRepository.save(branch);
        log.info("Nova filial cadastrada: [{}] (Código: [{}]) para a empresa [{}]",
                savedBranch.getName(), savedBranch.getCode(), savedBranch.getCompany().getName());
        return toResponseDTO(savedBranch);
    }

    @Transactional
    public BranchResponseDTO update(String code, BranchRequestDTO dto) {
        Branch branch = branchRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Branch", "code", code));

        validateInternalScopeAndGetBranch(branch.getCompany().getCnpj(), "atualizar");

        Company company = companyRepository.findByCnpj(dto.companyCnpj())
                .orElseThrow(() -> new ResourceNotFoundException("Company", "cnpj", dto.companyCnpj()));

        if (!branch.getCode().equals(dto.branchCode()) && branchRepository.existsByCode(dto.branchCode())) {
            throw new ValidationException("O código de filial '" + dto.branchCode() + "' já está em uso.");
        }

        branch.setName(dto.name());
        branch.setAddress(dto.address());
        branch.setCode(dto.branchCode());
        branch.setCompany(company);

        return toResponseDTO(branchRepository.save(branch));
    }

    @Transactional
    public void delete(String code) {
        Branch branch = branchRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Branch", "code", code));

        validateInternalScopeAndGetBranch(branch.getCompany().getCnpj(), "excluir");
        branchRepository.delete(branch);
        log.info("Filial código [{}] removida com sucesso.", code);
    }

    @Transactional(readOnly = true)
    public BranchResponseDTO findByCode(String code) {
        Branch branch = branchRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Branch", "code", code));

        validateInternalScopeAndGetBranch(branch.getCompany().getCnpj(), "visualizar");
        return toResponseDTO(branch);
    }

    @Transactional(readOnly = true)
    public List<BranchResponseDTO> findAll() {
        User loggedUser = securityUtils.getLoggedUser();
        Role role = loggedUser.getRole();

        if (role == Role.ADMIN) {
            return branchRepository.findAll().stream()
                    .map(this::toResponseDTO)
                    .collect(Collectors.toList());
        }

        if (role == Role.MANAGER || role == Role.SCALE_OPERATOR || role == Role.GATE_KEEPER) {
            if (loggedUser.getCompany() == null) {
                return List.of();
            }
            return branchRepository.findByCompanyCnpj(loggedUser.getCompany().getCnpj()).stream()
                    .map(this::toResponseDTO)
                    .collect(Collectors.toList());
        }

        throw new UnauthorizedAccessException(
                "Este endpoint não é acessível para sua Role. Use o endpoint de busca filtrada (/branches/company/{companyCnpj}).");
    }

    @Transactional(readOnly = true)
    public List<BranchResponseDTO> findBranchesByCompanyCnpj(String cnpj) {
        validateInternalScopeAndGetBranch(cnpj, "listar");
        return branchRepository.findByCompanyCnpj(cnpj).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BranchResponseDTO> findByCompanyName(String companyName) {
        return branchRepository.findByCompanyNameContainingIgnoreCase(companyName).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BranchMasterDTO> findByCompanyNameMaster(String companyName) {
        return branchRepository.findByCompanyNameContainingIgnoreCase(companyName).stream()
                .map(b -> new BranchMasterDTO(
                        b.getName(),
                        b.getAddress(),
                        b.getCode(),
                        b.getCompany().getName()))
                .collect(Collectors.toList());
    }

    private BranchResponseDTO toResponseDTO(Branch branch) {
        return new BranchResponseDTO(
                branch.getName(),
                branch.getAddress(),
                branch.getCode(),
                branch.getCompany().getCnpj(),
                branch.getCompany().getName());
    }
}