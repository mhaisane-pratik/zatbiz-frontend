package com.primezat.demo.repository;

import com.primezat.demo.model.EventChecklistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventChecklistItemRepository extends JpaRepository<EventChecklistItem, Long> {
    List<EventChecklistItem> findByProjectId(Long projectId);
}
