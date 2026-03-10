package br.com.davez.api.repository;

import br.com.davez.api.model.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByName(String name);
    boolean existsByName(String name);
    boolean existsByCnpj(String cnpj);
    Optional<Company> findByCnpj(String cnpj);
}
