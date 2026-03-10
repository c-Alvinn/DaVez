package br.com.davez.api.repository;

import br.com.davez.api.model.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {

    boolean existsByCode(String branchCode);
    
    Optional<Branch> findByCode(String code);

    List<Branch> findByCompanyId(Long companyId);

    List<Branch> findByCompanyCnpj(String cnpj);

    List<Branch> findByCompanyNameContainingIgnoreCase(String companyName);
}
