package br.com.davez.api.controller;

import br.com.davez.api.model.dto.carrier.CarrierRequestDTO;
import br.com.davez.api.model.dto.carrier.CarrierResponseDTO;
import br.com.davez.api.model.dto.user.RegisterCarrierUserRequestDTO;
import br.com.davez.api.service.CarrierService;
import br.com.davez.api.service.ScheduleService;
import br.com.davez.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carrier")
@Tag(name = "Transportadora", description = "Endpoints para Gestores de Transportadoras")
@SecurityRequirement(name = "bearer-key")
public class CarrierController {

    private final ScheduleService scheduleService;
    private final UserService userService;
    private final CarrierService carrierService;

    public CarrierController(ScheduleService scheduleService, UserService userService, CarrierService carrierService) {
        this.scheduleService = scheduleService;
        this.userService = userService;
        this.carrierService = carrierService;
    }

    @Operation(summary = "Criar Transportadora", description = "Cadastra uma nova transportadora no sistema.")
    @ApiResponse(responseCode = "201", description = "Transportadora criada")
    @PostMapping
    public ResponseEntity<CarrierResponseDTO> create(@RequestBody @Valid CarrierRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(carrierService.create(dto));
    }

    @Operation(summary = "Listar Transportadoras", description = "Retorna todas as transportadoras cadastradas.")
    @GetMapping
    public ResponseEntity<List<CarrierResponseDTO>> findAll() {
        return ResponseEntity.ok(carrierService.findAll());
    }

    @Operation(summary = "Buscar Transportadora por CNPJ", description = "Retorna detalhes de uma transportadora específica.")
    @GetMapping("/{cnpj}")
    public ResponseEntity<CarrierResponseDTO> findByCnpj(@PathVariable String cnpj) {
        return ResponseEntity.ok(carrierService.findByCnpj(cnpj));
    }

    @Operation(summary = "Atualizar Transportadora", description = "Atualiza dados de uma transportadora pelo CNPJ.")
    @PutMapping("/{cnpj}")
    public ResponseEntity<CarrierResponseDTO> update(@PathVariable String cnpj, @RequestBody @Valid CarrierRequestDTO dto) {
        return ResponseEntity.ok(carrierService.update(cnpj, dto));
    }

    @Operation(summary = "Excluir Transportadora", description = "Remove uma transportadora pelo CNPJ.")
    @DeleteMapping("/{cnpj}")
    public ResponseEntity<Void> delete(@PathVariable String cnpj) {
        carrierService.delete(cnpj);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Registrar Usuário de Transportadora", description = "Cria um usuário vinculado à transportadora.")
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterCarrierUserRequestDTO data) {
        userService.registerCarrierUser(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Estatísticas da Transportadora", description = "Retorna KPIs de agendamentos vinculados.")
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(scheduleService.getCarrierStats());
    }
}