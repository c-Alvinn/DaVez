package br.com.davez.api.service;

import br.com.davez.api.model.dto.carrier.CarrierRequestDTO;
import br.com.davez.api.model.dto.carrier.CarrierResponseDTO;
import br.com.davez.api.model.dto.master.CarrierMasterDTO;
import br.com.davez.api.model.entity.Carrier;
import br.com.davez.api.repository.CarrierRepository;
import br.com.davez.api.exceptions.ResourceNotFoundException;
import br.com.davez.api.exceptions.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CarrierService {

    private final CarrierRepository carrierRepository;

    public CarrierService(CarrierRepository carrierRepository) {
        this.carrierRepository = carrierRepository;
    }

    @Transactional
    public CarrierResponseDTO create(CarrierRequestDTO dto) {
        if (carrierRepository.existsByCnpj(dto.cnpj())) {
            throw new ValidationException("O CNPJ " + dto.cnpj() + " já está cadastrado para outra transportadora.");
        }

        Carrier carrier = new Carrier();
        carrier.setName(dto.name());
        carrier.setCnpj(dto.cnpj());

        Carrier savedCarrier = carrierRepository.save(carrier);
        log.info("Nova transportadora cadastrada: [{}] (CNPJ: [{}])", savedCarrier.getName(), savedCarrier.getCnpj());
        return toResponseDTO(savedCarrier);
    }

    @Transactional
    public void delete(String cnpj) {
        Carrier carrier = carrierRepository.findByCnpj(cnpj)
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "cnpj", cnpj));
        carrierRepository.delete(carrier);
        log.info("Transportadora CNPJ [{}] removida com sucesso.", cnpj);
    }

    @Transactional
    public CarrierResponseDTO update(String cnpj, CarrierRequestDTO dto) {
        Carrier carrier = carrierRepository.findByCnpj(cnpj)
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "cnpj", cnpj));

        if (!carrier.getName().equalsIgnoreCase(dto.name()) && carrierRepository.existsByName(dto.name())) {
            throw new ValidationException("O nome '" + dto.name() + "' já está em uso por outra transportadora.");
        }

        if (dto.cnpj() != null && !dto.cnpj().equals(carrier.getCnpj()) && carrierRepository.existsByCnpj(dto.cnpj())) {
            throw new ValidationException("O CNPJ " + dto.cnpj() + " já está em uso.");
        }

        carrier.setName(dto.name());
        carrier.setCnpj(dto.cnpj());

        Carrier updatedCarrier = carrierRepository.save(carrier);
        return toResponseDTO(updatedCarrier);
    }

    @Transactional(readOnly = true)
    public CarrierResponseDTO findByCnpj(String cnpj) {
        Carrier carrier = carrierRepository.findByCnpj(cnpj)
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "cnpj", cnpj));
        return toResponseDTO(carrier);
    }

    @Transactional(readOnly = true)
    public List<CarrierResponseDTO> findAll() {
        return carrierRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CarrierMasterDTO> findAllMaster() {
        return carrierRepository.findAll().stream()
                .map(c -> new CarrierMasterDTO(c.getName(), c.getCnpj()))
                .collect(Collectors.toList());
    }

    private CarrierResponseDTO toResponseDTO(Carrier carrier) {
        return new CarrierResponseDTO(
                carrier.getName(),
                carrier.getCnpj());
    }
}