package com.primezat.demo.repository;

import com.primezat.demo.model.EventContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventContactRepository extends JpaRepository<EventContact, Long> {
    List<EventContact> findByProjectId(Long projectId);
}
