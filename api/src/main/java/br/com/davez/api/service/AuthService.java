package br.com.davez.api.service;

import br.com.davez.api.model.dto.user.LoginRequestDTO;
import br.com.davez.api.model.dto.user.LoginResponseDTO;
import br.com.davez.api.model.dto.user.UserResponseDTO;
import br.com.davez.api.model.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthService(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public LoginResponseDTO authenticate(LoginRequestDTO data) {

        var authenticationToken = new UsernamePasswordAuthenticationToken(
                data.loginIdentifier(),
                data.password());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        User user = (User) authentication.getPrincipal();
        log.info("Usuário autenticado com sucesso: [{}] com perfil [{}]", user.getUsername(), user.getRole());

        return new LoginResponseDTO(tokenService.generateToken(user), mapUserToResponseDTO(user));
    }

    private UserResponseDTO mapUserToResponseDTO(User user) {

        String companyCnpj = user.getCompany() != null ? user.getCompany().getCnpj() : null;
        String companyName = user.getCompany() != null ? user.getCompany().getName() : null;

        String branchCode = user.getBranch() != null ? user.getBranch().getCode() : null;
        String branchName = user.getBranch() != null ? user.getBranch().getName() : null;

        String carrierCnpj = user.getCarrier() != null ? user.getCarrier().getCnpj() : null;
        String carrierName = user.getCarrier() != null ? user.getCarrier().getName() : null;

        return new UserResponseDTO(
                user.getName(),
                user.getUsername(),
                user.getCpf(),
                user.getPhoneNumber(),
                user.getRole(),
                companyCnpj,
                companyName,
                branchCode,
                branchName,
                carrierCnpj,
                carrierName);
    }
}