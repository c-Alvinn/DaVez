package br.com.davez.api.model.dto.schedule;

import io.swagger.v3.oas.annotations.media.Schema;

import br.com.davez.api.model.enums.GrainType;
import br.com.davez.api.model.enums.OperationType;
import br.com.davez.api.model.enums.QueueStatus;
import br.com.davez.api.model.enums.TruckType;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(
                @Schema(description = "ID do Agendamento", example = "1") Long id,

                @Schema(description = "ID da Filial", example = "1") Long branchId,
                @Schema(description = "Nome da Filial", example = "Filial Sul") String branchName,
                @Schema(description = "ID do Motorista", example = "5") Long driverId,
                @Schema(description = "Nome do Motorista", example = "João da Silva") String driverName,
                @Schema(description = "ID da Transportadora", example = "10") Long carrierId,
                @Schema(description = "Nome da Transportadora", example = "TransLogística") String carrierName,

                @Schema(description = "Tipo de Grão", example = "SOJA") GrainType grainType,
                @Schema(description = "Tipo de Operação", example = "LOADING") OperationType operationType,
                @Schema(description = "Placa do Veículo", example = "ABC-1234") String licensePlate,
                @Schema(description = "Tipo de Caminhão", example = "BITREN") TruckType truckType,

                @Schema(description = "Status na Fila", example = "WAITING") QueueStatus queueStatus,
                @Schema(description = "Posição na Fila", example = "3") Integer queuePosition,

                @Schema(description = "Data/Hora do Agendamento") LocalDateTime scheduledAt,
                @Schema(description = "Data/Hora da Chamada") LocalDateTime calledAt,
                @Schema(description = "Data/Hora da Liberação") LocalDateTime releasedAt) {
}