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

    @Operation(summary = "Atualizar Filial", description = "Atualiza dados de uma filial.")
    @ApiResponse(responseCode = "200", description = "Filial atualizada")
    @ApiResponse(responseCode = "404", description = "Filial não encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<BranchResponseDTO> update(@PathVariable Long id, @RequestBody @Valid BranchRequestDTO dto) {
        BranchResponseDTO response = branchService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Excluir Filial", description = "Remove uma filial pelo ID.")
    @ApiResponse(responseCode = "204", description = "Filial excluída")
    @ApiResponse(responseCode = "404", description = "Filial não encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        branchService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Listar Filiais", description = "Retorna todas as filiais cadastradas.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping
    public ResponseEntity<List<BranchResponseDTO>> findAll() {
        List<BranchResponseDTO> response = branchService.findAll();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Buscar Filial por ID", description = "Retorna detalhes de uma filial.")
    @ApiResponse(responseCode = "200", description = "Filial encontrada")
    @ApiResponse(responseCode = "404", description = "Filial não encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<BranchResponseDTO> findById(@PathVariable Long id) {
        BranchResponseDTO response = branchService.findById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Listar Filiais por Empresa", description = "Retorna filiais de uma empresa específica.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<BranchResponseDTO>> findByCompanyId(@PathVariable Long companyId) {
        List<BranchResponseDTO> response = branchService.findBranchesByCompanyId(companyId);
        return ResponseEntity.ok(response);
    }
}