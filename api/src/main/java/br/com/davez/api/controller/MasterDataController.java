package br.com.davez.api.controller;

import br.com.davez.api.model.dto.master.BranchMasterDTO;
import br.com.davez.api.model.dto.master.CarrierMasterDTO;
import br.com.davez.api.model.dto.master.CompanyMasterDTO;
import br.com.davez.api.service.BranchService;
import br.com.davez.api.service.CarrierService;
import br.com.davez.api.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/master")
@Tag(name = "Master Data", description = "Endpoints para busca de dados mestres (selections)")
@SecurityRequirement(name = "bearer-key")
public class MasterDataController {

    private final CompanyService companyService;
    private final BranchService branchService;
    private final CarrierService carrierService;

    public MasterDataController(CompanyService companyService, BranchService branchService, CarrierService carrierService) {
        this.companyService = companyService;
        this.branchService = branchService;
        this.carrierService = carrierService;
    }

    @Operation(summary = "Listar Empresas (Master)", description = "Retorna nome e CNPJ de todas as empresas.")
    @GetMapping("/companies")
    public ResponseEntity<List<CompanyMasterDTO>> findAllCompanies() {
        return ResponseEntity.ok(companyService.findAllMaster());
    }

    @Operation(summary = "Listar Transportadoras (Master)", description = "Retorna nome e CNPJ de todas as transportadoras.")
    @GetMapping("/carriers")
    public ResponseEntity<List<CarrierMasterDTO>> findAllCarriers() {
        return ResponseEntity.ok(carrierService.findAllMaster());
    }

    @Operation(summary = "Listar Filiais por Empresa (Master)", description = "Retorna filiais de uma empresa pelo nome.")
    @GetMapping("/branches")
    public ResponseEntity<List<BranchMasterDTO>> findBranches(
            @RequestParam(required = false) String companyName) {
        return ResponseEntity.ok(branchService.findByCompanyNameMaster(companyName));
    }
}
