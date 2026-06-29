package com.primezat.demo.repository;

import com.primezat.demo.model.MedicalShopInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicalShopInfoRepository extends JpaRepository<MedicalShopInfo, Long> {
    Optional<MedicalShopInfo> findByProjectId(Long projectId);
}
