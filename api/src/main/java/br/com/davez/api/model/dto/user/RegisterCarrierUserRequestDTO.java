package br.com.davez.api.model.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterCarrierUserRequestDTO(

                @Schema(description = "Nome completo do usuário da transportadora", example = "Carlos Transportes") @NotBlank(message = "O nome completo é obrigatório.") String name,

                @Schema(description = "Nome de usuário para login", example = "carlos_transp") @NotBlank(message = "O nome de usuário é obrigatório.") String username,

                @Schema(description = "Senha de acesso", example = "SenhaForte123!") @NotBlank(message = "A senha é obrigatória.") String password,

                @Schema(description = "ID da Transportadora vinculada", example = "10") @NotNull(message = "O ID da Transportadora é obrigatório.") Long carrierId) {
}
