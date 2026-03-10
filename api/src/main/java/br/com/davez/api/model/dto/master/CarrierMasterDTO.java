package br.com.davez.api.model.dto.master;

import io.swagger.v3.oas.annotations.media.Schema;

public record CarrierMasterDTO(
    @Schema(description = "Nome da transportadora", example = "TransUltra Logística") String name,
    @Schema(description = "CNPJ da transportadora", example = "12345678000199") String cnpj
) {}
