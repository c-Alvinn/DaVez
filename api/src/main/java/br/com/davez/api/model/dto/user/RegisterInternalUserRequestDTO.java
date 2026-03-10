package br.com.davez.api.model.dto.user;

import br.com.davez.api.model.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterInternalUserRequestDTO(

        @Schema(description = "Nome completo do funcionário", example = "Ana Souza") @NotBlank(message = "O nome é obrigatório.") String name,

        @Schema(description = "Username para login", example = "ana.souza") @NotBlank(message = "O nome de usuário é obrigatório.") String username,

        @Schema(description = "Senha inicial", example = "123Mudar!") @NotBlank(message = "A senha é obrigatória.") String password,

        @Schema(description = "Papel/Permissão no sistema", example = "ADMIN") @NotNull(message = "O papel (Role) é obrigatório.") Role role,

        @Schema(description = "Código da Filial de alocação", example = "SP-001") @NotBlank(message = "O código da filial é obrigatório.") String branchCode,

        @Schema(description = "CNPJ da Empresa", example = "12345678000199") @NotBlank(message = "O CNPJ da empresa é obrigatório.") String companyCnpj) {
}