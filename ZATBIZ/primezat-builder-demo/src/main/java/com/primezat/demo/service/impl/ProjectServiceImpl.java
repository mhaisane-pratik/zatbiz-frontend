package com.primezat.demo.service.impl;

import com.primezat.demo.exception.ResourceNotFoundException;
import com.primezat.demo.model.Project;
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
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    }

    @Override
    public Project createProject(Project project) {
        if (project.getBlocksJson() == null || project.getBlocksJson().trim().isEmpty()) {
            project.setBlocksJson("[]");
        }
        if (project.getStatus() == null) {
            project.setStatus("Draft");
        }
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long id, Project updatedProject) {
        Project project = getProjectById(id);
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
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}



