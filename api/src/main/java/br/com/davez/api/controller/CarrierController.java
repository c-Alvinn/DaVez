package br.com.davez.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import br.com.davez.api.model.dto.carrier.CarrierRequestDTO;
import br.com.davez.api.model.dto.carrier.CarrierResponseDTO;
import br.com.davez.api.service.CarrierService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/carrier")
@Tag(name = "Transportadoras", description = "Gestão de Transportadoras")
@SecurityRequirement(name = "bearer-key")
public class CarrierController {

    private final CarrierService carrierService;

    public CarrierController(CarrierService carrierService) {
        this.carrierService = carrierService;
    }

    @Operation(summary = "Criar Transportadora", description = "Cadastra uma nova transportadora.")
    @ApiResponse(responseCode = "201", description = "Transportadora criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<CarrierResponseDTO> create(@RequestBody @Valid CarrierRequestDTO dto) {
        CarrierResponseDTO response = carrierService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Excluir Transportadora", description = "Remove uma transportadora pelo ID.")
    @ApiResponse(responseCode = "204", description = "Transportadora excluída com sucesso")
    @ApiResponse(responseCode = "404", description = "Transportadora não encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        carrierService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar Transportadora", description = "Atualiza os dados de uma transportadora.")
    @ApiResponse(responseCode = "200", description = "Transportadora atualizada com sucesso")
    @ApiResponse(responseCode = "404", description = "Transportadora não encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<CarrierResponseDTO> update(@PathVariable Long id, @RequestBody @Valid CarrierRequestDTO dto) {
        CarrierResponseDTO response = carrierService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Listar Transportadoras", description = "Retorna todas as transportadoras cadastradas.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @GetMapping
    public ResponseEntity<List<CarrierResponseDTO>> findAll() {
        List<CarrierResponseDTO> response = carrierService.findAll();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Buscar Transportadora por ID", description = "Retorna os detalhes de uma transportadora.")
    @ApiResponse(responseCode = "200", description = "Transportadora encontrada")
    @ApiResponse(responseCode = "404", description = "Transportadora não encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<CarrierResponseDTO> findById(@PathVariable Long id) {
        CarrierResponseDTO response = carrierService.findById(id);
        return ResponseEntity.ok(response);
    }
}