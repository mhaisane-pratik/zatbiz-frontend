package com.primezat.demo.repository;

import com.primezat.demo.model.EventSeoSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventSeoSettingsRepository extends JpaRepository<EventSeoSettings, Long> {
    Optional<EventSeoSettings> findByProjectId(Long projectId);
}
