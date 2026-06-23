package com.primezat.demo.service.impl;

import com.primezat.demo.exception.ResourceNotFoundException;
import com.primezat.demo.exception.UnauthorizedException;
import com.primezat.demo.model.Project;
import com.primezat.demo.model.User;
import com.primezat.demo.repository.ProjectRepository;
import com.primezat.demo.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> getProjectsByUser(User user) {
        return projectRepository.findByUser(user);
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    }

    @Override
    public Project createProjectForUser(Project project, User user) {
        project.setUser(user);
        if (project.getBlocksJson() == null || project.getBlocksJson().trim().isEmpty()) {
            project.setBlocksJson("[]");
        }
        if (project.getStatus() == null) {
            project.setStatus("Draft");
        }
        return projectRepository.save(project);
    }

    @Override
    public Project updateProjectForUser(Long id, Project updatedProject, User user) {
        Project project = getProjectById(id);
        
        // Ownership check
        if (project.getUser() == null || !project.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You do not have permission to modify this project");
        }

        if (updatedProject.getName() != null) {
            project.setName(updatedProject.getName());
        }
        if (updatedProject.getDescription() != null) {
            project.setDescription(updatedProject.getDescription());
        }
        if (updatedProject.getBlocksJson() != null) {
            project.setBlocksJson(updatedProject.getBlocksJson());
        }
        if (updatedProject.getStatus() != null) {
            project.setStatus(updatedProject.getStatus());
        }
        return projectRepository.save(project);
    }

    @Override
    public void deleteProjectForUser(Long id, User user) {
        Project project = getProjectById(id);
        
        // Ownership check
        if (project.getUser() == null || !project.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You do not have permission to delete this project");
        }
        
        projectRepository.delete(project);
    }
}



