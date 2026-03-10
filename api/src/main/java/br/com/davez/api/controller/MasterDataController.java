package br.com.davez.api.controller;

import br.com.davez.api.model.dto.branch.BranchResponseDTO;
import br.com.davez.api.model.enums.GrainType;
import br.com.davez.api.model.enums.TruckType;
import br.com.davez.api.service.BranchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/master")
@Tag(name = "Dados Mestres", description = "Endpoints para consulta de tabelas básicas e Enums")
@SecurityRequirement(name = "bearer-key")
public class MasterDataController {

    private final BranchService branchService;

    public MasterDataController(BranchService branchService) {
        this.branchService = branchService;
    }

    @Operation(summary = "Listar Filiais por Nome da Empresa", description = "Retorna filiais filtradas pelo nome da empresa.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping("/branches")
    public ResponseEntity<List<BranchResponseDTO>> findBranchesByCompanyName(@RequestParam String companyName) {
        return ResponseEntity.ok(branchService.findByCompanyName(companyName));
    }

    @Operation(summary = "Listar Tipos de Grãos", description = "Retorna os tipos de cargas disponíveis.")
    @GetMapping("/grain-types")
    public ResponseEntity<List<Map<String, String>>> getGrainTypes() {
        List<Map<String, String>> types = Arrays.stream(GrainType.values())
                .map(type -> Map.of("code", type.name(), "label", type.name()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(types);
    }

    @Operation(summary = "Listar Tipos de Caminhão", description = "Retorna os tipos de veículos disponíveis.")
    @GetMapping("/truck-types")
    public ResponseEntity<List<Map<String, String>>> getTruckTypes() {
        List<Map<String, String>> types = Arrays.stream(TruckType.values())
                .map(type -> Map.of("code", type.name(), "label", type.name()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(types);
    }
}
