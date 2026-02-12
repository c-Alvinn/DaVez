package br.com.davez.api.model.dto.carrier;

import io.swagger.v3.oas.annotations.media.Schema;

public record CarrierResponseDTO(
                @Schema(description = "ID da transportadora", example = "10") Long id,

                @Schema(description = "Nome da transportadora", example = "TransUltra Logística") String name) {
}