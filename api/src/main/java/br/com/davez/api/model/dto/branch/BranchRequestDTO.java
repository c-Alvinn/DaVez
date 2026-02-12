package br.com.davez.api.model.dto.branch;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record BranchRequestDTO(
                @Schema(description = "Nome da filial", example = "Filial Sorriso") @NotBlank(message = "O nome da filial é obrigatório.") String name,

                @Schema(description = "Endereço completo", example = "Rodovia BR-163, Km 500") @NotBlank(message = "O endereço é obrigatório.") String address,

                @Schema(description = "Código identificador (UX Pátio)", example = "SP-001") @NotBlank(message = "O código de identificação da filial é obrigatório.") @Pattern(regexp = "^[A-Z]{2}-\\d{3}$", message = "O código da filial deve seguir o padrão: XX-999 (Ex: SP-001).") String branchCode,

                @Schema(description = "ID da empresa matriz", example = "1") @NotNull(message = "O ID da empresa vinculada é obrigatório.") Long companyId) {
}