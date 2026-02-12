package br.com.davez.api.model.dto.branch;

import io.swagger.v3.oas.annotations.media.Schema;

public record BranchResponseDTO(
                @Schema(description = "ID da filial", example = "1") Long id,

                @Schema(description = "Nome da filial", example = "Filial Sorriso") String name,

                @Schema(description = "Endereço", example = "Rodovia BR-163, Km 500") String address,

                @Schema(description = "Código identificador", example = "SP-001") String branchCode,

                @Schema(description = "ID da empresa matriz", example = "1") Long companyId,

                @Schema(description = "Nome da empresa", example = "AgroVez Comércio") String companyName) {
}