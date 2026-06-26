package com.primezat.demo.repository;

import com.primezat.demo.model.EventCalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventCalendarEventRepository extends JpaRepository<EventCalendarEvent, Long> {
    List<EventCalendarEvent> findByProjectId(Long projectId);
}
