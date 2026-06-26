package com.primezat.demo.repository;

import com.primezat.demo.model.EventAgencyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventAgencyInfoRepository extends JpaRepository<EventAgencyInfo, Long> {
    Optional<EventAgencyInfo> findByProjectId(Long projectId);
}
