package br.com.davez.api.model.dto.user;

import br.com.davez.api.model.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

public record UserResponseDTO(
                @Schema(description = "Nome completo", example = "Admin Principal") String name,

                @Schema(description = "Username", example = "admin") String username,

                @Schema(description = "CPF do usuário", example = "12345678900") String cpf,

                @Schema(description = "Telefone de contato", example = "11999998888") String phoneNumber,

                @Schema(description = "Permissão de acesso", example = "ADMIN") Role role,

                @Schema(description = "CNPJ da empresa vinculada", example = "12345678000199") String companyCnpj,

                @Schema(description = "Nome da empresa", example = "AgroFarm S.A.") String companyName,

                @Schema(description = "Código da filial vinculada", example = "SP-001") String branchCode,

                @Schema(description = "Nome da filial", example = "Unidade Sorriso") String branchName,

                @Schema(description = "CNPJ da transportadora (se aplicável)", example = "12345678000199") String carrierCnpj,

                @Schema(description = "Nome da transportadora", example = "TransLogística") String carrierName) {
}