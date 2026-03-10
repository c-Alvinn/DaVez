package br.com.davez.api.repository;

import br.com.davez.api.model.entity.Carrier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarrierRepository extends JpaRepository<Carrier, Long> {

    boolean existsByName(String name);
    
    boolean existsByCnpj(String cnpj);

    Optional<Carrier> findByCnpj(String cnpj);
}
