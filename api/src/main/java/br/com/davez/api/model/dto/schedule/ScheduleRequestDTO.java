package br.com.davez.api.model.dto.schedule;

import io.swagger.v3.oas.annotations.media.Schema;

import br.com.davez.api.model.enums.GrainType;
import br.com.davez.api.model.enums.OperationType;
import br.com.davez.api.model.enums.TruckType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ScheduleRequestDTO(

                @Schema(description = "ID da Filial", example = "1") @NotNull(message = "A Filial é obrigatório.") Long branchId,

                @Schema(description = "ID da Empresa (Opcional)", example = "1") Long companyId,

                @Schema(description = "CPF do Motorista", example = "123.456.789-00") String driverCpf,

                @Schema(description = "Tipo de Grão", example = "SOJA") @NotNull(message = "O tipo de grão é obrigatório.") GrainType grainType,

                @Schema(description = "Tipo de Operação", example = "LOADING") @NotNull(message = "O tipo de operação é obrigatório.") OperationType operationType,

                @Schema(description = "ID da Transportadora", example = "10") Long carrierId,

                @Schema(description = "Placa do Veículo", example = "ABC-1234") @NotBlank(message = "A placa do veículo é obrigatória.") String licensePlate,

                @Schema(description = "Tipo de Caminhão", example = "BITREN") @NotNull(message = "O tipo de caminhão é obrigatório.") TruckType truckType) {
}