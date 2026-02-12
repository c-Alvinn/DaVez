package br.com.davez.api.model.dto.user;

import br.com.davez.api.model.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

public record UserResponseDTO(
                @Schema(description = "ID do usuário", example = "1") Long id,

                @Schema(description = "Nome completo", example = "Admin Principal") String name,

                @Schema(description = "Username", example = "admin") String username,

                @Schema(description = "CPF do usuário", example = "12345678900") String cpf,

                @Schema(description = "Telefone de contato", example = "11999998888") String phoneNumber,

                @Schema(description = "Permissão de acesso", example = "ADMIN") Role role,

                @Schema(description = "ID da empresa vinculada", example = "1") Long companyId,

                @Schema(description = "Nome da empresa", example = "AgroFarm S.A.") String companyName,

                @Schema(description = "ID da filial vinculada", example = "2") Long branchId,

                @Schema(description = "Nome da filial", example = "Unidade Sorriso") String branchName,

                @Schema(description = "ID da transportadora (se aplicável)", example = "5") Long carrierId,

                @Schema(description = "Nome da transportadora", example = "TransLogística") String carrierName) {
}