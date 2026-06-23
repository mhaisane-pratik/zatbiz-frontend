package com.primezat.demo.service;

import com.primezat.demo.model.Project;
import com.primezat.demo.model.User;
import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    List<Project> getProjectsByUser(User user);
    Project getProjectById(Long id);
    Project createProjectForUser(Project project, User user);
    Project updateProjectForUser(Long id, Project updatedProject, User user);
    void deleteProjectForUser(Long id, User user);
}
