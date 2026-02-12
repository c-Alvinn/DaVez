package br.com.davez.api.model.dto.company;

import io.swagger.v3.oas.annotations.media.Schema;

public record CompanyResponseDTO(
                @Schema(description = "ID da empresa", example = "1") Long id,

                @Schema(description = "Nome da empresa", example = "AgroVez Comércio") String name,

                @Schema(description = "CNPJ", example = "12345678000199") String cnpj) {
}