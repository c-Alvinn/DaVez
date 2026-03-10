package br.com.davez.api.model.dto.schedule;

import io.swagger.v3.oas.annotations.media.Schema;
import br.com.davez.api.model.enums.GrainType;
import br.com.davez.api.model.enums.OperationType;
import br.com.davez.api.model.enums.TruckType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ScheduleRequestDTO(
                @Schema(description = "Código da Filial", example = "SC-001") 
                @NotBlank(message = "O código da filial é obrigatório.") String branchCode,

                @Schema(description = "CNPJ da Empresa (Opcional)", example = "12345678000199") 
                String companyCnpj,

                @Schema(description = "CPF do Motorista (Opcional, se logado)", example = "12345678900") 
                String driverCpf,

                @Schema(description = "Tipo de Grão", example = "SOJA") 
                @NotNull(message = "O tipo de grão é obrigatório.") GrainType grainType,

                @Schema(description = "Tipo de Operação", example = "LOADING") 
                @NotNull(message = "O tipo de operação é obrigatório.") OperationType operationType,

                @Schema(description = "CNPJ da Transportadora (Opcional)", example = "12345678000199") 
                String carrierCnpj,

                @Schema(description = "Placa do Veículo", example = "ABC-1234") 
                @NotBlank(message = "A placa do veículo é obrigatória.") String licensePlate,

                @Schema(description = "Tipo de Caminhão", example = "BITREN") 
                @NotNull(message = "O tipo de caminhão é obrigatório.") TruckType truckType) {
}