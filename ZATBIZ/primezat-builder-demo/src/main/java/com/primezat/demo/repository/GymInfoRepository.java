package com.primezat.demo.repository;

import com.primezat.demo.model.GymInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GymInfoRepository extends JpaRepository<GymInfo, Long> {
    Optional<GymInfo> findByProjectId(Long projectId);
}
