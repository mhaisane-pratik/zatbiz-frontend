package com.primezat.demo.repository;

import com.primezat.demo.model.StoreSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StoreSettingsRepository extends JpaRepository<StoreSettings, Long> {
    Optional<StoreSettings> findByProjectId(Long projectId);
}
