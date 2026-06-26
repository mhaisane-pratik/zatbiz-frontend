package com.primezat.demo.repository;

import com.primezat.demo.model.EventSupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventSupportTicketRepository extends JpaRepository<EventSupportTicket, Long> {
    List<EventSupportTicket> findByProjectId(Long projectId);
}
