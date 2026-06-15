package com.primezat.demo.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "primezat-jwt-secret-key-2026-super-secret-key-12345";
    private final String ISSUER = "primezat";
    private final long EXPIRATION_TIME = 86400000; // 24 hours in milliseconds

    public String generateToken(Long userId, String username, String email) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        return JWT.create()
                .withIssuer(ISSUER)
                .withClaim("userId", userId)
                .withClaim("username", username)
                .withClaim("email", email)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build();
            return verifier.verify(token);
        } catch (Exception e) {
            return null; // Token verification failed (expired, invalid signature, etc.)
        }
    }
}
