package com.primezat.demo.repository;

import com.primezat.demo.model.EventInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventInvoiceRepository extends JpaRepository<EventInvoice, Long> {
    List<EventInvoice> findByProjectId(Long projectId);
}
