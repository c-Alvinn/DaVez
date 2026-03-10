package br.com.davez.api.controller;

import br.com.davez.api.model.dto.user.LoginRequestDTO;
import br.com.davez.api.model.dto.user.LoginResponseDTO;
import br.com.davez.api.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Endpoints para login e encerramento de sessão")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Realizar Login", description = "Autentica um usuário e retorna um token JWT.")
    @ApiResponse(responseCode = "200", description = "Login realizado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @ApiResponse(responseCode = "403", description = "Credenciais inválidas")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO data) {
        return ResponseEntity.ok(authService.authenticate(data));
    }

    @Operation(summary = "Realizar Logout", description = "Invalida a sessão do usuário (operação do lado do cliente via deleção do token).")
    @ApiResponse(responseCode = "204", description = "Logout realizado com sucesso")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}