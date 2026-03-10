package br.com.davez.api.model.dto.schedule;

import io.swagger.v3.oas.annotations.media.Schema;

import br.com.davez.api.model.enums.GrainType;
import br.com.davez.api.model.enums.OperationType;
import br.com.davez.api.model.enums.QueueStatus;
import br.com.davez.api.model.enums.TruckType;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(
                @Schema(description = "Código do Ticket", example = "DV-XYZ-1234") String ticketCode,

                @Schema(description = "Código da Filial", example = "SP-001") String branchCode,
                @Schema(description = "Nome da Filial", example = "Filial Sul") String branchName,
                @Schema(description = "CPF do Motorista", example = "123.456.789-00") String driverCpf,
                @Schema(description = "Nome do Motorista", example = "João da Silva") String driverName,
                @Schema(description = "CNPJ da Transportadora", example = "12345678000199") String carrierCnpj,
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