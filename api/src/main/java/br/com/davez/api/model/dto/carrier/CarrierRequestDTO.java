package br.com.davez.api.model.dto.carrier;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record CarrierRequestDTO(
                @Schema(description = "Nome da transportadora", example = "TransUltra Logística") @NotBlank(message = "O nome da transportadora é obrigatório.") String name) {
}
