package br.com.davez.api.controller;

import br.com.davez.api.model.dto.schedule.ScheduleResponseDTO;
import br.com.davez.api.model.dto.user.RegisterDriverRequestDTO;
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

import java.util.List;

@RestController
@RequestMapping("/driver")
@Tag(name = "Motorista", description = "Endpoints exclusivos para o fluxo do motorista")
@SecurityRequirement(name = "bearer-key")
public class DriverController {

    private final ScheduleService scheduleService;
    private final UserService userService;

    public DriverController(ScheduleService scheduleService, UserService userService) {
        this.scheduleService = scheduleService;
        this.userService = userService;
    }

    @Operation(summary = "Registrar Motorista", description = "Cadastra um novo motorista independente ou vinculado.")
    @ApiResponse(responseCode = "201", description = "Motorista cadastrado com sucesso")
    @ApiResponse(responseCode = "400", description = "CPF inválido ou já cadastrado")
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDriverRequestDTO data) {
        userService.registerDriver(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Ver Agendamento Ativo", description = "Retorna o agendamento atual do motorista logado.")
    @ApiResponse(responseCode = "200", description = "Agendamento encontrado")
    @ApiResponse(responseCode = "404", description = "Nenhum agendamento ativo")
    @GetMapping("/appointment/active")
    public ResponseEntity<ScheduleResponseDTO> getActiveAppointment() {
        return ResponseEntity.ok(scheduleService.findActiveByLoggedDriver());
    }

    @Operation(summary = "Ver Histórico de Agendamentos", description = "Retorna a lista de agendamentos concluídos do motorista logado.")
    @GetMapping("/appointment/history")
    public ResponseEntity<List<ScheduleResponseDTO>> getHistory() {
        return ResponseEntity.ok(scheduleService.findHistoryByLoggedDriver());
    }
}
