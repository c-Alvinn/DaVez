package br.com.davez.api.model.dto.master;

import io.swagger.v3.oas.annotations.media.Schema;

public record CompanyMasterDTO(
    @Schema(description = "Nome da empresa", example = "AgroVez Comércio") String name,
    @Schema(description = "CNPJ", example = "12345678000199") String cnpj
) {}
