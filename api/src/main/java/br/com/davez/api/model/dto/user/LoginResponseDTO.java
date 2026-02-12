package br.com.davez.api.model.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponseDTO(
                @Schema(description = "Token JWT para autenticação", example = "eyJhbGciOiJIUzI1NiIsIn...") String token,

                @Schema(description = "Dados do usuário autenticado") UserResponseDTO user) {
}