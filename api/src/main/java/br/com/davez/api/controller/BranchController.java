package br.com.davez.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import br.com.davez.api.model.dto.branch.BranchRequestDTO;
import br.com.davez.api.model.dto.branch.BranchResponseDTO;
import br.com.davez.api.service.BranchService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/branches")
@Tag(name = "Filiais", description = "Gestão de Filiais")
@SecurityRequirement(name = "bearer-key")
public class BranchController {

    private final BranchService branchService;

    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @Operation(summary = "Criar Filial", description = "Cadastra uma nova filial vinculada a uma empresa.")
    @ApiResponse(responseCode = "201", description = "Filial criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<BranchResponseDTO> create(@RequestBody @Valid BranchRequestDTO dto) {
        BranchResponseDTO response = branchService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Atualizar Filial", description = "Atualiza dados de uma filial pelo código.")
    @ApiResponse(responseCode = "200", description = "Filial atualizada")
    @ApiResponse(responseCode = "404", description = "Filial não encontrada")
    @PutMapping("/{code}")
    public ResponseEntity<BranchResponseDTO> update(@PathVariable String code, @RequestBody @Valid BranchRequestDTO dto) {
        BranchResponseDTO response = branchService.update(code, dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Excluir Filial", description = "Remove uma filial pelo código.")
    @ApiResponse(responseCode = "204", description = "Filial excluída")
    @ApiResponse(responseCode = "404", description = "Filial não encontrada")
    @DeleteMapping("/{code}")
    public ResponseEntity<Void> delete(@PathVariable String code) {
        branchService.delete(code);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Listar Filiais", description = "Retorna todas as filiais cadastradas.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping
    public ResponseEntity<List<BranchResponseDTO>> findAll() {
        List<BranchResponseDTO> response = branchService.findAll();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Buscar Filial por Código", description = "Retorna detalhes de uma filial.")
    @ApiResponse(responseCode = "200", description = "Filial encontrada")
    @ApiResponse(responseCode = "404", description = "Filial não encontrada")
    @GetMapping("/{code}")
    public ResponseEntity<BranchResponseDTO> findByCode(@PathVariable String code) {
        BranchResponseDTO response = branchService.findByCode(code);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Listar Filiais por Empresa", description = "Retorna filiais de uma empresa específica pelo CNPJ.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping("/company/{companyCnpj}")
    public ResponseEntity<List<BranchResponseDTO>> findByCompanyCnpj(@PathVariable String companyCnpj) {
        List<BranchResponseDTO> response = branchService.findBranchesByCompanyCnpj(companyCnpj);
        return ResponseEntity.ok(response);
    }
}