package br.com.davez.api.model.dto.user;

import br.com.davez.api.model.enums.Role;

public record UserRegistrationResponseDTO(
        Long id,
        String name,
        String username,
        Role role
) {
}
