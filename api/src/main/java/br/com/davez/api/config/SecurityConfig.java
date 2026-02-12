package br.com.davez.api.config;

import br.com.davez.api.security.SecurityFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final SecurityFilter securityFilter;

    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> {
                    // Endpoints públicos
                    req.requestMatchers(HttpMethod.POST, "/auth/login").permitAll();
                    req.requestMatchers(HttpMethod.POST, "/user/driver/register").permitAll();
                    req.requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll();

                    // Endpoints de Agendamento
                    req.requestMatchers(HttpMethod.GET, "/schedules").hasAnyRole("ADMIN", "MANAGER", "CARRIER",
                            "SCALE_OPERATOR", "GATE_KEEPER");
                    req.requestMatchers(HttpMethod.POST, "/schedules").hasAnyRole("ADMIN", "MANAGER", "CARRIER",
                            "SCALE_OPERATOR", "GATE_KEEPER", "DRIVER");
                    req.requestMatchers(HttpMethod.PUT, "/schedules/**").hasAnyRole("ADMIN", "MANAGER",
                            "SCALE_OPERATOR", "GATE_KEEPER");
                    req.requestMatchers(HttpMethod.DELETE, "/schedules/**").hasAnyRole("ADMIN", "MANAGER");

                    // Endpoints de Usuário
                    req.requestMatchers(HttpMethod.GET, "/users").hasAnyRole("ADMIN", "MANAGER");
                    req.requestMatchers(HttpMethod.POST, "/users").hasAnyRole("ADMIN", "MANAGER");
                    req.requestMatchers(HttpMethod.PUT, "/users/**").hasAnyRole("ADMIN", "MANAGER");
                    req.requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN");

                    // Endpoints de Empresa
                    req.requestMatchers(HttpMethod.GET, "/companies").hasAnyRole("ADMIN", "MANAGER");
                    req.requestMatchers(HttpMethod.POST, "/companies").hasRole("ADMIN");
                    req.requestMatchers(HttpMethod.PUT, "/companies/**").hasRole("ADMIN");
                    req.requestMatchers(HttpMethod.DELETE, "/companies/**").hasRole("ADMIN");

                    // Endpoints de Transportadora
                    req.requestMatchers(HttpMethod.GET, "/carriers").hasAnyRole("ADMIN", "MANAGER", "CARRIER");
                    req.requestMatchers(HttpMethod.POST, "/carriers").hasAnyRole("ADMIN", "MANAGER");
                    req.requestMatchers(HttpMethod.PUT, "/carriers/**").hasAnyRole("ADMIN", "MANAGER", "CARRIER");
                    req.requestMatchers(HttpMethod.DELETE, "/carriers/**").hasRole("ADMIN");

                    // Endpoints de Filial
                    req.requestMatchers(HttpMethod.GET, "/branches").hasAnyRole("ADMIN", "MANAGER", "CARRIER",
                            "SCALE_OPERATOR", "GATE_KEEPER");
                    req.requestMatchers(HttpMethod.POST, "/branches").hasRole("ADMIN");
                    req.requestMatchers(HttpMethod.PUT, "/branches/**").hasRole("ADMIN");
                    req.requestMatchers(HttpMethod.DELETE, "/branches/**").hasRole("ADMIN");

                    // Qualquer outra requisição precisa estar autenticada
                    req.anyRequest().authenticated();
                })
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}