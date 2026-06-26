package com.primezat.demo.repository;

import com.primezat.demo.model.EventNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventNotificationRepository extends JpaRepository<EventNotification, Long> {
    List<EventNotification> findByProjectId(Long projectId);
}
