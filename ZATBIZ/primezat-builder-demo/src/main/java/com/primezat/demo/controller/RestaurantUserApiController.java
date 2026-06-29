package com.primezat.demo.controller;

import com.primezat.demo.model.RestaurantUser;
import com.primezat.demo.repository.RestaurantUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurant/users")
@CrossOrigin(origins = "*")
public class RestaurantUserApiController {

    @Autowired
    private RestaurantUserRepository repository;

    @GetMapping
    public List<RestaurantUser> getUsers(@RequestParam Long projectId) {
        return repository.findByProjectId(projectId);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RestaurantUser user) {
        if (user.getProjectId() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Project ID is required"));
        }
        Optional<RestaurantUser> existing = repository.findByProjectIdAndEmail(user.getProjectId(), user.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already registered for this workspace"));
        }
        RestaurantUser saved = repository.save(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String projIdStr = credentials.get("projectId");
        
        if (email == null || password == null || projIdStr == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email, password, and projectId are required"));
        }
        
        Long projectId = Long.parseLong(projIdStr);
        Optional<RestaurantUser> userOpt = repository.findByProjectIdAndEmail(projectId, email);
        if (userOpt.isPresent()) {
            RestaurantUser user = userOpt.get();
            if (password.equals(user.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
    }
}
