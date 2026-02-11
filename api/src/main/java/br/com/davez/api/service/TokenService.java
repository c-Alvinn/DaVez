package br.com.davez.api.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import br.com.davez.api.model.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${davez.jwt.secret}")
    private String secret;

    @Value("${davez.jwt.expiration}")
    private long expirationTimeMs;

    private static final String ISSUER = "davez-queue-api";

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer(ISSUER)
                    .withSubject(user.getUsername())
                    .withExpiresAt(getExpirationInstant())
                    .withIssuedAt(Instant.now())
                    .withClaim("userId", user.getId())
                    .withClaim("role", user.getRole().getRoleName())
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException("Erro ao gerar token JWT.", exception);
        }
    }

    public String getSubject(String tokenJWT) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build()
                    .verify(tokenJWT)
                    .getSubject();

        } catch (JWTVerificationException exception){
            return "";
        }
    }

    private Instant getExpirationInstant() {
        return LocalDateTime.now()
                .plusSeconds(expirationTimeMs / 1000)
                .toInstant(ZoneOffset.of("-03:00"));
    }
}
