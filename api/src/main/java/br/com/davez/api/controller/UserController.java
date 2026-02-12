package br.com.davez.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import br.com.davez.api.model.dto.user.RegisterCarrierUserRequestDTO;
import br.com.davez.api.model.dto.user.RegisterDriverRequestDTO;
import br.com.davez.api.model.dto.user.RegisterInternalUserRequestDTO;
import br.com.davez.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
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

    @Operation(summary = "Registrar Usuário de Transportadora", description = "Cria um usuário vinculado a uma transportadora.")
    @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping("/carrier/register")
    public ResponseEntity<Void> carrierDriver(@RequestBody @Valid RegisterCarrierUserRequestDTO data) {
        userService.registerCarrierUser(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Registrar Motorista", description = "Cadastra um novo motorista independente ou vinculado.")
    @SecurityRequirements()
    @ApiResponse(responseCode = "201", description = "Motorista cadastrado com sucesso")
    @ApiResponse(responseCode = "400", description = "CPF inválido ou já cadastrado")
    @PostMapping("/driver/register")
    public ResponseEntity<Void> registerDriver(@RequestBody @Valid RegisterDriverRequestDTO data) {
        userService.registerDriver(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}