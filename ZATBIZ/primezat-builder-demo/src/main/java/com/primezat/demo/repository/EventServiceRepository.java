package com.primezat.demo.repository;

import com.primezat.demo.model.EventService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventServiceRepository extends JpaRepository<EventService, Long> {
    List<EventService> findByProjectId(Long projectId);
}
