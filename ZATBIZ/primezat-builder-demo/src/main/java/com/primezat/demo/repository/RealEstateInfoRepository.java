package com.primezat.demo.repository;

import com.primezat.demo.model.RealEstateInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RealEstateInfoRepository extends JpaRepository<RealEstateInfo, Long> {
    Optional<RealEstateInfo> findByProjectId(Long projectId);
}
