package com.primezat.demo.controller;

import com.primezat.demo.config.JwtUtil;
import com.primezat.demo.model.User;
import com.primezat.demo.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthApiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");

        if (email != null) {
            email = email.trim().toLowerCase();
        }

        if (username == null || username.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "All fields are required!");
            return ResponseEntity.badRequest().body(error);
        }

        // Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email is already registered!");
            return ResponseEntity.badRequest().body(error);
        }

        // Hash password
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

        // Create and save user
        User user = new User(username.trim(), email.trim(), hashedPassword);
        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("username", savedUser.getUsername());
        response.put("email", savedUser.getEmail());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email != null) {
            email = email.trim().toLowerCase();
        }

        if (email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email and password are required!");
            return ResponseEntity.badRequest().body(error);
        }

        Optional<User> optionalUser = userRepository.findByEmail(email.trim());

        if (optionalUser.isEmpty() || !BCrypt.checkpw(password, optionalUser.get().getPassword())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password!");
            return ResponseEntity.status(401).body(error);
        }

        User user = optionalUser.get();

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getId(), user.getUsername(), user.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }
}
