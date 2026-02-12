package br.com.davez.api.model.dto.schedule;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ScheduleTransitionDTO(

                @Schema(description = "Placa do Veículo", example = "ABC-1234") @NotBlank(message = "A placa do veículo é obrigatória.") @Size(min = 7, max = 8, message = "A placa deve ter entre 7 e 8 caracteres.") String licensePlate,

                @Schema(description = "Nome da Filial", example = "Filial Sul") @NotBlank(message = "O nome da filial é obrigatório.") String branchName) {
}