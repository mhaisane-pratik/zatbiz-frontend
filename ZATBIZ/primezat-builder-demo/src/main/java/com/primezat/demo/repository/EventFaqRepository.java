package com.primezat.demo.repository;

import com.primezat.demo.model.EventFaq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventFaqRepository extends JpaRepository<EventFaq, Long> {
    List<EventFaq> findByProjectId(Long projectId);
}
