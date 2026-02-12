package br.com.davez.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import br.com.davez.api.model.dto.report.QueueStatusReportDTO;
import br.com.davez.api.model.dto.schedule.ScheduleRequestDTO;
import br.com.davez.api.model.dto.schedule.ScheduleResponseDTO;
import br.com.davez.api.model.dto.schedule.ScheduleTransitionDTO;
import br.com.davez.api.model.enums.ReportPeriod;
import br.com.davez.api.service.ReportingService;
import br.com.davez.api.service.ScheduleService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/schedule")
@Tag(name = "Agendamentos", description = "Gestão de Agendamentos e Fila")
@SecurityRequirement(name = "bearer-key")
public class SchedulingController {

    private final ScheduleService scheduleService;
    private final ReportingService reportingService;

    public SchedulingController(ScheduleService scheduleService, ReportingService reportingService) {
        this.scheduleService = scheduleService;
        this.reportingService = reportingService;
    }

    @Operation(summary = "Criar Agendamento", description = "Cria um novo agendamento para um motorista/veículo.")
    @ApiResponse(responseCode = "201", description = "Agendamento criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> create(@RequestBody @Valid ScheduleRequestDTO dto) {
        ScheduleResponseDTO response = scheduleService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Listar Agendamentos", description = "Retorna todos os agendamentos.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping
    public ResponseEntity<List<ScheduleResponseDTO>> findAll() {
        List<ScheduleResponseDTO> response = scheduleService.findAll();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Buscar Agendamento por ID", description = "Retorna os detalhes de um agendamento.")
    @ApiResponse(responseCode = "200", description = "Agendamento encontrado")
    @ApiResponse(responseCode = "404", description = "Agendamento não encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> findById(@PathVariable Long id) {
        ScheduleResponseDTO response = scheduleService.findById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Mover para Em Atendimento", description = "Altera o status do agendamento para EM ATENDIMENTO (Chamada).")
    @ApiResponse(responseCode = "200", description = "Status atualizado com sucesso")
    @ApiResponse(responseCode = "400", description = "Transição inválida")
    @ApiResponse(responseCode = "404", description = "Agendamento não encontrado")
    @PatchMapping("/in-service")
    public ResponseEntity<Void> moveToInService(@RequestBody @Valid ScheduleTransitionDTO request) {
        scheduleService.moveToInService(request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Mover para Concluído", description = "Finaliza o atendimento e libera o veículo.")
    @ApiResponse(responseCode = "200", description = "Status atualizado com sucesso")
    @ApiResponse(responseCode = "404", description = "Agendamento não encontrado")
    @PatchMapping("/completed")
    public ResponseEntity<Void> moveToCompleted(@RequestBody @Valid ScheduleTransitionDTO request) {
        scheduleService.moveToCompleted(request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Cancelar Agendamento", description = "Cancela um agendamento existente.")
    @ApiResponse(responseCode = "200", description = "Agendamento cancelado com sucesso")
    @ApiResponse(responseCode = "404", description = "Agendamento não encontrado")
    @PatchMapping("/cancel")
    public ResponseEntity<Void> cancel(@RequestBody @Valid ScheduleTransitionDTO request) {
        scheduleService.cancel(request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Excluir Agendamento", description = "Remove um agendamento pelo ID.")
    @ApiResponse(responseCode = "204", description = "Agendamento excluído")
    @ApiResponse(responseCode = "404", description = "Agendamento não encontrado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        scheduleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Relatório de Status da Fila", description = "Retorna o status atual da fila por filial.")
    @ApiResponse(responseCode = "200", description = "Relatório gerado")
    @GetMapping("/reports/queue-status")
    public ResponseEntity<QueueStatusReportDTO> getQueueStatusReport(@RequestParam Long branchId) {
        return ResponseEntity.ok(reportingService.getQueueStatusByBranch(branchId));
    }

    @Operation(summary = "Exportar Relatório de Desempenho (PDF)", description = "Gera um PDF com o relatório de desempenho do período.")
    @ApiResponse(responseCode = "200", description = "PDF gerado com sucesso")
    @GetMapping("/reports/performance/pdf")
    public void exportToPdf(@RequestParam(defaultValue = "TODAY") ReportPeriod period,
            HttpServletResponse response) throws Exception {

        response.setContentType("application/pdf");

        String dateStamp = LocalDate.now().format(DateTimeFormatter.ofPattern("dd_MM_yyyy"));

        String fileName = String.format("relatorio_atendimentos_%s_%s.pdf", period.name(), dateStamp);

        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        reportingService.generatePerformanceReport(period, response);
    }
}