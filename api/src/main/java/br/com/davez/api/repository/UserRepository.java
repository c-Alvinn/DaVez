package br.com.davez.api.repository;

import br.com.davez.api.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByCpfAndActiveTrue(String cpf);

    Optional<User> findByUsernameAndActiveTrue(String username);

    boolean existsByCpf(String cpf);
    boolean existsByUsername(String username);

    Optional<User> findByCpf(String cpf);
}