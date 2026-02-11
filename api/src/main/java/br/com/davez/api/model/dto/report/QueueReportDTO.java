package br.com.davez.api.model.dto.report;

import br.com.davez.api.model.enums.QueueStatus;
import java.util.Map;

public record QueueReportDTO(
        Long branchId,
        String branchName,
        Map<QueueStatus, Long> statusCounts,
        long totalActive
) {}