package com.primezat.demo.repository;

import com.primezat.demo.model.EventBlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventBlogRepository extends JpaRepository<EventBlog, Long> {
    List<EventBlog> findByProjectId(Long projectId);
}
