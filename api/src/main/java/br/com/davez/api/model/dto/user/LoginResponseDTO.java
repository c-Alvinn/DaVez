package br.com.davez.api.model.dto.user;

public record LoginResponseDTO(
        String token,
        UserResponseDTO user
) {}