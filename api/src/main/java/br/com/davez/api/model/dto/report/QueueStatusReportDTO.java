package br.com.davez.api.model.dto.report;

public record QueueStatusReportDTO(
        String branchCode,
        String branchName,
        long scheduled,
        long inService,
        long completed,
        long canceled,
        long totalActive
) {}