package br.com.davez.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import br.com.davez.api.model.dto.company.CompanyRequestDTO;
import br.com.davez.api.model.dto.company.CompanyResponseDTO;
import br.com.davez.api.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.security.SecurityRequirement; // Import added

@RestController
@RequestMapping("/company")
@Tag(name = "Empresas", description = "Gestão de Empresas")
@SecurityRequirement(name = "bearer-key") // Class-level security
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @Operation(summary = "Criar Empresa", description = "Cadastra uma nova empresa no sistema.")
    @ApiResponse(responseCode = "201", description = "Empresa criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos ou CNPJ já existente")
    @PostMapping
    public ResponseEntity<CompanyResponseDTO> create(@RequestBody @Valid CompanyRequestDTO dto) {
        CompanyResponseDTO response = companyService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Excluir Empresa", description = "Remove uma empresa pelo ID.")
    @ApiResponse(responseCode = "204", description = "Empresa excluída com sucesso")
    @ApiResponse(responseCode = "404", description = "Empresa não encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar Empresa", description = "Atualiza os dados de uma empresa existente.")
    @ApiResponse(responseCode = "200", description = "Empresa atualizada com sucesso")
    @ApiResponse(responseCode = "404", description = "Empresa não encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponseDTO> update(@PathVariable Long id, @RequestBody @Valid CompanyRequestDTO dto) {
        CompanyResponseDTO response = companyService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Listar Empresas", description = "Retorna todas as empresas cadastradas.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping
    public ResponseEntity<List<CompanyResponseDTO>> findAll() {
        List<CompanyResponseDTO> response = companyService.findAll();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Buscar Empresa por ID", description = "Retorna os detalhes de uma empresa específica.")
    @ApiResponse(responseCode = "200", description = "Empresa encontrada")
    @ApiResponse(responseCode = "404", description = "Empresa não encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponseDTO> findById(@PathVariable Long id) {
        CompanyResponseDTO response = companyService.findById(id);
        return ResponseEntity.ok(response);
    }
}