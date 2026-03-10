package br.com.davez.api.model.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record RegisterCarrierUserRequestDTO(

                @Schema(description = "Nome completo do usuário da transportadora", example = "Carlos Transportes") @NotBlank(message = "O nome completo é obrigatório.") String name,

                @Schema(description = "Nome de usuário para login", example = "carlos_transp") @NotBlank(message = "O nome de usuário é obrigatório.") String username,

                @Schema(description = "Senha de acesso", example = "SenhaForte123!") @NotBlank(message = "A senha é obrigatória.") String password,

                @Schema(description = "CNPJ da Transportadora vinculada", example = "12345678000199") @NotBlank(message = "O CNPJ da Transportadora é obrigatório.") String carrierCnpj) {
}
