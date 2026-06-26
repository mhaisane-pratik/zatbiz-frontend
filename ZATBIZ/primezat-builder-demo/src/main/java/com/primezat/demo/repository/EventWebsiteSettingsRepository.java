package com.primezat.demo.repository;

import com.primezat.demo.model.EventWebsiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventWebsiteSettingsRepository extends JpaRepository<EventWebsiteSettings, Long> {
    Optional<EventWebsiteSettings> findByProjectId(Long projectId);
}
