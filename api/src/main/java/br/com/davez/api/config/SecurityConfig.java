package br.com.davez.api.config;

import br.com.davez.api.security.SecurityFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
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
                    req.requestMatchers(HttpMethod.POST, "/driver/register").permitAll();
                    req.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**")
                            .permitAll();

                    // Autenticação
                    req.requestMatchers(HttpMethod.POST, "/auth/logout").authenticated();

                    // Motorista (Driver)
                    req.requestMatchers("/driver/**").hasRole("DRIVER");

                    // Operador (Operator)
                    req.requestMatchers("/operator/**").hasAnyRole("GATE_KEEPER", "SCALE_OPERATOR", "ADMIN");

                    // Transportadora (Carrier)
                    req.requestMatchers("/carrier/**").hasAnyRole("CARRIER", "ADMIN");

                    // Dados Mestres (Master Data)
                    req.requestMatchers("/master-data/**").authenticated();

                    // Agendamentos (Geral e Administrativo)
                    req.requestMatchers(HttpMethod.GET, "/schedule/**").hasAnyRole("ADMIN", "MANAGER", "CARRIER", "SCALE_OPERATOR", "GATE_KEEPER");
                    req.requestMatchers(HttpMethod.POST, "/schedule").hasAnyRole("ADMIN", "MANAGER", "CARRIER", "DRIVER");
                    req.requestMatchers(HttpMethod.PATCH, "/schedule/**").hasAnyRole("ADMIN", "MANAGER", "SCALE_OPERATOR", "GATE_KEEPER");
                    req.requestMatchers(HttpMethod.DELETE, "/schedule/**").hasRole("ADMIN");

                    // Usuários e Gestão
                    req.requestMatchers(HttpMethod.GET, "/user/profile").authenticated();
                    req.requestMatchers(HttpMethod.PATCH, "/user/password").authenticated();
                    req.requestMatchers("/user/**").hasAnyRole("ADMIN", "MANAGER");

                    // Empresas e Filiais
                    req.requestMatchers("/companies/**").hasAnyRole("ADMIN", "MANAGER");
                    req.requestMatchers("/branches/**").hasAnyRole("ADMIN", "MANAGER");

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