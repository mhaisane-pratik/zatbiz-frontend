package com.primezat.demo.repository;

import com.primezat.demo.model.EventPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventPaymentRepository extends JpaRepository<EventPayment, Long> {
    List<EventPayment> findByProjectId(Long projectId);
}
