package com.primezat.demo.repository;

import com.primezat.demo.model.EventQuotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventQuotationRepository extends JpaRepository<EventQuotation, Long> {
    List<EventQuotation> findByProjectId(Long projectId);
}
