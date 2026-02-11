package br.com.davez.api.model.dto.user;

import br.com.davez.api.model.enums.Role;

public record UserResponseDTO(
        Long id,
        String name,
        String username,
        String cpf,
        String phoneNumber,
        Role role,
        Long companyId,
        String companyName,
        Long branchId,
        String branchName,
        Long carrierId,
        String carrierName
) {}