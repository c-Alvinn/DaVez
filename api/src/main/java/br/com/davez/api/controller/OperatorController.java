package br.com.davez.api.controller;

import br.com.davez.api.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/operator")
@Tag(name = "Operador", description = "Endpoints para Operadores de Balança e Portaria")
@SecurityRequirement(name = "bearer-key")
public class OperatorController {

    private final ScheduleService scheduleService;

    public OperatorController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @Operation(summary = "Estatísticas do Operador", description = "Retorna contadores de agendamentos do dia para a unidade do operador.")
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(scheduleService.getOperatorStats());
    }

    @Operation(summary = "Notificar Motorista", description = "Sinaliza que o motorista de um ticket específico deve comparecer à balança.")
    @PatchMapping("/appointment/{ticketCode}/notify")
    public ResponseEntity<Void> notifyDriver(@PathVariable String ticketCode) {
        scheduleService.notifyDriver(ticketCode);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Iniciar Atendimento", description = "Muda o status do agendamento para IN_SERVICE via ticketCode.")
    @PatchMapping("/appointment/{ticketCode}/start")
    public ResponseEntity<Void> startService(@PathVariable String ticketCode) {
        scheduleService.startServiceByTicketCode(ticketCode);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Finalizar Atendimento", description = "Muda o status do agendamento para COMPLETED via ticketCode.")
    @PatchMapping("/appointment/{ticketCode}/complete")
    public ResponseEntity<Void> completeService(@PathVariable String ticketCode) {
        scheduleService.completeServiceByTicketCode(ticketCode);
        return ResponseEntity.noContent().build();
    }
}
