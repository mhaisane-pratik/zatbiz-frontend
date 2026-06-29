package com.primezat.demo.repository;

import com.primezat.demo.model.EventCatalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventCatalogRepository extends JpaRepository<EventCatalog, Long> {
    List<EventCatalog> findByProjectId(Long projectId);
    List<EventCatalog> findByProjectIdAndType(Long projectId, String type);
}
