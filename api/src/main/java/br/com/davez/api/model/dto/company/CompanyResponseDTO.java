package br.com.davez.api.model.dto.company;

public record CompanyResponseDTO(
        Long id,
        String name,
        String cnpj
) {}