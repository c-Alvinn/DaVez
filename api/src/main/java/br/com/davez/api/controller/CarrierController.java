package br.com.davez.api.controller;

import br.com.davez.api.model.dto.user.RegisterCarrierUserRequestDTO;
import br.com.davez.api.service.ScheduleService;
import br.com.davez.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/carrier")
@Tag(name = "Transportadora", description = "Endpoints para Gestores de Transportadoras")
@SecurityRequirement(name = "bearer-key")
public class CarrierController {

    private final ScheduleService scheduleService;
    private final UserService userService;

    public CarrierController(ScheduleService scheduleService, UserService userService) {
        this.scheduleService = scheduleService;
        this.userService = userService;
    }

    @Operation(summary = "Registrar Usuário de Transportadora", description = "Cria um usuário vinculado à transportadora logada ou uma nova.")
    @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterCarrierUserRequestDTO data) {
        userService.registerCarrierUser(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Estatísticas da Transportadora", description = "Retorna KPIs de agendamentos vinculados à transportadora logada.")
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(scheduleService.getCarrierStats());
    }
}