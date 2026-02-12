package br.com.davez.api.model.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RegisterDriverRequestDTO(

        @Schema(description = "Nome completo do motorista", example = "João da Silva") @NotBlank(message = "O nome é obrigatório.") String name,

        @Schema(description = "CPF do motorista (apenas números)", example = "12345678900") @NotBlank(message = "O CPF é obrigatório.") @Pattern(regexp = "\\d{11}", message = "CPF deve ter 11 dígitos.") String cpf,

        @Schema(description = "Senha de acesso", example = "Motorista@2024") @NotBlank(message = "A senha é obrigatória.") String password,

        @Schema(description = "Telefone para contato/WhatsApp", example = "11999998888") @NotBlank(message = "O número de telefone é obrigatório para contato.") String phoneNumber) {
}