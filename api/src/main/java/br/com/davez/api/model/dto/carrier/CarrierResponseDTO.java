package br.com.davez.api.model.dto.carrier;

import io.swagger.v3.oas.annotations.media.Schema;

public record CarrierResponseDTO(
                @Schema(description = "Nome da transportadora", example = "TransUltra Logística") String name,

                @Schema(description = "CNPJ da transportadora", example = "12345678000199") String cnpj) {
}