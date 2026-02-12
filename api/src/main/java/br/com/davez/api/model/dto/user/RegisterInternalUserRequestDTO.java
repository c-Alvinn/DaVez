package br.com.davez.api.model.dto.user;

import br.com.davez.api.model.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record RegisterInternalUserRequestDTO(

                @Schema(description = "Nome completo do funcionário", example = "Ana Souza") @NotBlank(message = "O nome é obrigatório.") String name,

                @Schema(description = "Username para login", example = "ana.souza") @NotBlank(message = "O nome de usuário é obrigatório.") String username,

                @Schema(description = "CPF (opcional para internos, obrigatório se for motorista)", example = "12345678900") @Pattern(regexp = "^\\d{11}$|^$", message = "CPF deve ter 11 dígitos ou ser vazio.") String cpf,

                @Schema(description = "Senha inicial", example = "123Mudar!") @NotBlank(message = "A senha é obrigatória.") String password,

                @Schema(description = "Papel/Permissão no sistema", example = "ADMIN") @NotNull(message = "O papel (Role) é obrigatório.") Role role,

                @Schema(description = "ID da Filial de alocação", example = "1") @NotNull(message = "O ID da filial é obrigatório.") Long branchId,

                @Schema(description = "ID da Empresa", example = "1") @NotNull(message = "O ID da empresa é obrigatório.") Long companyId) {
}