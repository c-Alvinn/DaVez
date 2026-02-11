package br.com.davez.api.model.dto.report;

public record TimeMetricsDTO(
        Long branchId,
        Double averageTimeMinutes,
        long totalCompleted,
        String periodLabel
) {}