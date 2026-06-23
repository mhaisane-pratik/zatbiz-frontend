package com.primezat.demo.controller;

import com.primezat.demo.config.JwtUtil;
import com.primezat.demo.model.Project;
import com.primezat.demo.model.User;
import com.primezat.demo.repository.UserRepository;
import com.primezat.demo.service.ProjectService;
import com.primezat.demo.exception.UnauthorizedException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectApiController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // Helper method to authenticate user from JWT
    private User getAuthenticatedUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        DecodedJWT decoded = jwtUtil.verifyToken(token);
        if (decoded == null) {
            throw new UnauthorizedException("Invalid or expired token");
        }
        Long userId = decoded.getClaim("userId").asLong();
        if (userId == null) {
            throw new UnauthorizedException("Token does not contain user ID");
        }
        return userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    // Get all projects for the logged-in user
    @GetMapping
    public List<Project> getAllProjects(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = getAuthenticatedUser(authHeader);
        return projectService.getProjectsByUser(user);
    }

    // Get a specific project by ID (public for rendering site layout)
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        return ResponseEntity.ok(project);
    }

    // Create a new project for the logged-in user
    @PostMapping
    public Project createProject(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Project project) {
        User user = getAuthenticatedUser(authHeader);
        return projectService.createProjectForUser(project, user);
    }

    // Update an existing project owned by the logged-in user
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Project updatedProject) {
        User user = getAuthenticatedUser(authHeader);
        Project saved = projectService.updateProjectForUser(id, updatedProject, user);
        return ResponseEntity.ok(saved);
    }

    // Delete a project owned by the logged-in user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = getAuthenticatedUser(authHeader);
        projectService.deleteProjectForUser(id, user);
        return ResponseEntity.ok().build();
    }
}
