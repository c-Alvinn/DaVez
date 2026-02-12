package br.com.davez.api.model.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @Schema(description = "Identificador de login (Username, CPF ou Email)", example = "motorista123") @NotBlank String loginIdentifier,

        @Schema(description = "Senha do usuário", example = "SenhaSegura123!") @NotBlank String password) {
}