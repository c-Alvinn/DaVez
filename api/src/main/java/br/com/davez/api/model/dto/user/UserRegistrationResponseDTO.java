package br.com.davez.api.model.dto.user;

import br.com.davez.api.model.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

public record UserRegistrationResponseDTO(
                @Schema(description = "ID do usuário criado", example = "15") Long id,

                @Schema(description = "Nome do usuário", example = "João da Silva") String name,

                @Schema(description = "Username cadastrado", example = "joao.silva") String username,

                @Schema(description = "Role atribuída", example = "DRIVER") Role role) {
}
