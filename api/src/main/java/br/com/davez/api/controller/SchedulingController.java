package br.com.davez.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import br.com.davez.api.model.dto.report.QueueStatusReportDTO;
import br.com.davez.api.model.dto.schedule.ScheduleRequestDTO;
import br.com.davez.api.model.dto.schedule.ScheduleResponseDTO;
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
@Tag(name = "Agendamentos Gerais", description = "Gestão Global de Agendamentos e Relatórios")
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

    @Operation(summary = "Listar Agendamentos", description = "Retorna todos os agendamentos conforme o escopo do usuário.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping
    public ResponseEntity<List<ScheduleResponseDTO>> findAll() {
        List<ScheduleResponseDTO> response = scheduleService.findAll();
        return ResponseEntity.ok(response);
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