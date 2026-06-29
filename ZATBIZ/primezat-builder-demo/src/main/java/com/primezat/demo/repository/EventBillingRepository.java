package com.primezat.demo.repository;

import com.primezat.demo.model.EventBilling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventBillingRepository extends JpaRepository<EventBilling, Long> {
    List<EventBilling> findByProjectId(Long projectId);
    List<EventBilling> findByProjectIdAndType(Long projectId, String type);
}
