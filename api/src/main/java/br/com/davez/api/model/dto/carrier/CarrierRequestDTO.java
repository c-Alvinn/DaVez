package br.com.davez.api.model.dto.carrier;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CarrierRequestDTO(
                @Schema(description = "Nome da transportadora", example = "TransUltra Logística") 
                @NotBlank(message = "O nome da transportadora é obrigatório.") 
                String name,

                @Schema(description = "CNPJ da transportadora", example = "12345678000199") 
                @NotBlank(message = "O CNPJ da transportadora é obrigatório.")
                @Pattern(regexp = "\\d{14}", message = "O CNPJ deve conter exatamente 14 dígitos numéricos.")
                String cnpj) {
}
