package com.primezat.demo.service;

import com.primezat.demo.model.Project;
import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    Project createProject(Project project);
    Project updateProject(Long id, Project updatedProject);
    void deleteProject(Long id);
}
