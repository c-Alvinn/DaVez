package br.com.davez.api.model.dto.company;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CompanyRequestDTO(
                @Schema(description = "Nome da empresa", example = "AgroVez Comércio") @NotBlank(message = "O nome da empresa é obrigatório.") String name,

                @Schema(description = "CNPJ (apenas números)", example = "12345678000199") @NotBlank(message = "O CNPJ é obrigatório.") @Pattern(regexp = "^\\d{14}$", message = "CNPJ deve ter 14 dígitos.") String cnpj) {
}