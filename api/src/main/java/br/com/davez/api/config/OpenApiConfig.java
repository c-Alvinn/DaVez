package br.com.davez.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

        @Bean
        public OpenAPI customOpenAPI() {
                return new OpenAPI()
                                .info(new Info()
                                                .title("DaVez API")
                                                .description("Sistema de Gestão de Filas e Pátio para Agronegócio. Controla fluxo de caminhões, triagem e chamadas.")
                                                .version("1.0.0")
                                                .contact(new Contact()
                                                                .name("Equipe DaVez")
                                                                .email("tech@davez.com.br"))
                                                .license(new License()
                                                                .name("Apache 2.0")
                                                                .url("http://springdoc.org")))
                                .addSecurityItem(new SecurityRequirement().addList("bearer-key"))
                                .components(new Components()
                                                .addSecuritySchemes("bearer-key",
                                                                new SecurityScheme()
                                                                                .type(SecurityScheme.Type.HTTP)
                                                                                .scheme("bearer")
                                                                                .bearerFormat("JWT")));
        }
}