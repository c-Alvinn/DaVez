package br.com.davez.api.controller;

import br.com.davez.api.model.dto.report.QueueStatusReportDTO;
import br.com.davez.api.model.dto.schedule.ScheduleRequestDTO;
import br.com.davez.api.model.dto.schedule.ScheduleResponseDTO;
import br.com.davez.api.model.dto.schedule.ScheduleTransitionDTO;
import br.com.davez.api.service.ReportingService;
import br.com.davez.api.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scheduling")
@Tag(name = "Agendamento", description = "Endpoints para gestão de agendamentos e filas")
@SecurityRequirement(name = "bearer-key")
public class SchedulingController {

    private final ScheduleService scheduleService;
    private final ReportingService reportingService;

    public SchedulingController(ScheduleService scheduleService, ReportingService reportingService) {
        this.scheduleService = scheduleService;
        this.reportingService = reportingService;
    }

    @Operation(summary = "Criar Agendamento", description = "Cria um novo agendamento na fila.")
    @ApiResponse(responseCode = "201", description = "Agendamento criado com sucesso")
    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> create(@RequestBody @Valid ScheduleRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(scheduleService.create(dto));
    }

    @Operation(summary = "Listar Agendamentos", description = "Retorna agendamentos baseados no perfil logado.")
    @GetMapping
    public ResponseEntity<List<ScheduleResponseDTO>> findAll() {
        return ResponseEntity.ok(scheduleService.findAll());
    }

    @Operation(summary = "Buscar Agendamento por Ticket", description = "Retorna detalhes de um agendamento específico.")
    @GetMapping("/{ticketCode}")
    public ResponseEntity<ScheduleResponseDTO> findByTicketCode(@PathVariable String ticketCode) {
        return ResponseEntity.ok(scheduleService.findByTicketCode(ticketCode));
    }

    @Operation(summary = "Solicitar Atendimento", description = "Mover para IN_SERVICE baseada na placa e filial.")
    @PostMapping("/call-next")
    public ResponseEntity<Void> callNext(@RequestBody @Valid ScheduleTransitionDTO transition) {
        scheduleService.moveToInService(transition);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Concluir Atendimento", description = "Mover para COMPLETED baseada na placa e filial.")
    @PostMapping("/complete")
    public ResponseEntity<Void> complete(@RequestBody @Valid ScheduleTransitionDTO transition) {
        scheduleService.moveToCompleted(transition);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Cancelar Agendamento", description = "Mover para CANCELED baseada na placa e filial.")
    @PostMapping("/cancel")
    public ResponseEntity<Void> cancel(@RequestBody @Valid ScheduleTransitionDTO transition) {
        scheduleService.cancel(transition);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Excluir Agendamento Permanentemente", description = "Remove do banco de dados (ADMIN apenas).")
    @DeleteMapping("/{ticketCode}")
    public ResponseEntity<Void> delete(@PathVariable String ticketCode) {
        scheduleService.deleteByTicketCode(ticketCode);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Status da Fila (Dashboard)", description = "KPIs rápidos para o dashboard do operador.")
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(scheduleService.getOperatorStats());
    }

    @Operation(summary = "Relatório de Status da Fila", description = "Dados consolidados da fila por filial.")
    @GetMapping("/reports/queue-status")
    public ResponseEntity<QueueStatusReportDTO> getQueueStatusReport(@RequestParam String branchCode) {
        return ResponseEntity.ok(reportingService.getQueueStatusReport(branchCode));
    }
}