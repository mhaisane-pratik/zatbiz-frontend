package com.primezat.demo.repository;

import com.primezat.demo.model.EventLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventLeadRepository extends JpaRepository<EventLead, Long> {
    List<EventLead> findByProjectId(Long projectId);
}
