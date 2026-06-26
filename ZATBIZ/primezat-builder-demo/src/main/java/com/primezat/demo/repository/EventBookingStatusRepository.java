package com.primezat.demo.repository;

import com.primezat.demo.model.EventBookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventBookingStatusRepository extends JpaRepository<EventBookingStatus, Long> {
    List<EventBookingStatus> findByProjectId(Long projectId);
}
