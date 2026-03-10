package br.com.davez.api.controller;

import br.com.davez.api.model.dto.user.RegisterInternalUserRequestDTO;
import br.com.davez.api.model.dto.user.UserResponseDTO;
import br.com.davez.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Tag(name = "Usuários", description = "Gestão de Usuários Internos e Perfil")
@SecurityRequirement(name = "bearer-key")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Registrar Usuário Interno", description = "Cria um novo usuário administrativo ou operacional (vinculado a uma filial).")
    @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos ou usuário já existente")
    @PostMapping("/internal/register")
    public ResponseEntity<Void> registerInternal(@RequestBody @Valid RegisterInternalUserRequestDTO data) {
        userService.registerInternalUser(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Ver Perfil", description = "Retorna os dados do usuário logado.")
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getProfile() {
        return ResponseEntity.ok(userService.getLoggedUserProfile());
    }

    @Operation(summary = "Alterar Senha", description = "Permite que o usuário logado altere sua própria senha.")
    @PatchMapping("/password")
    public ResponseEntity<Void> changePassword(@RequestBody String newPassword) {
        userService.changePassword(newPassword);
        return ResponseEntity.noContent().build();
    }
}