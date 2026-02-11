package br.com.davez.api.model.dto.schedule;

import br.com.davez.api.model.enums.GrainType;
import br.com.davez.api.model.enums.OperationType;
import br.com.davez.api.model.enums.QueueStatus;
import br.com.davez.api.model.enums.TruckType;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(
        Long id,

        Long branchId,
        String branchName,
        Long driverId,
        String driverName,
        Long carrierId,
        String carrierName,

        GrainType grainType,
        OperationType operationType,
        String licensePlate,
        TruckType truckType,

        QueueStatus queueStatus,
        Integer queuePosition,

        LocalDateTime scheduledAt,
        LocalDateTime calledAt,
        LocalDateTime releasedAt
) {}