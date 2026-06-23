package com.primezat.demo.repository;

import com.primezat.demo.model.HospitalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HospitalInfoRepository extends JpaRepository<HospitalInfo, Long> {
    Optional<HospitalInfo> findByProjectId(Long projectId);
}
