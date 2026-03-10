package br.com.davez.api.service;

import br.com.davez.api.model.dto.carrier.CarrierRequestDTO;
import br.com.davez.api.model.dto.carrier.CarrierResponseDTO;
import br.com.davez.api.model.entity.Carrier;
import br.com.davez.api.repository.CarrierRepository;
import br.com.davez.api.exceptions.ResourceNotFoundException;
import br.com.davez.api.exceptions.ValidationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarrierService {

    private final CarrierRepository carrierRepository;

    public CarrierService(CarrierRepository carrierRepository) {
        this.carrierRepository = carrierRepository;
    }

    @Transactional
    public CarrierResponseDTO create(CarrierRequestDTO dto) {
        if (carrierRepository.existsByName(dto.name())) {
            throw new ValidationException("O nome da transportadora '" + dto.name() + "' já está em uso.");
        }
        if (dto.cnpj() != null && carrierRepository.existsByCnpj(dto.cnpj())) {
            throw new ValidationException("O CNPJ " + dto.cnpj() + " já está cadastrado.");
        }

        Carrier carrier = new Carrier();
        carrier.setName(dto.name());
        carrier.setCnpj(dto.cnpj());

        Carrier savedCarrier = carrierRepository.save(carrier);
        return toResponseDTO(savedCarrier);
    }

    @Transactional
    public CarrierResponseDTO update(Long id, CarrierRequestDTO dto) {
        Carrier carrier = carrierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "id", id));

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

    @Transactional
    public void delete(Long id) {
        if (!carrierRepository.existsById(id)) {
            throw new ResourceNotFoundException("Carrier", "id", id);
        }
        carrierRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public CarrierResponseDTO findById(Long id) {
        Carrier carrier = carrierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Carrier", "id", id));
        return toResponseDTO(carrier);
    }

    @Transactional(readOnly = true)
    public List<CarrierResponseDTO> findAll() {
        return carrierRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private CarrierResponseDTO toResponseDTO(Carrier carrier) {
        return new CarrierResponseDTO(
                carrier.getId(),
                carrier.getName(),
                carrier.getCnpj()
        );
    }
}