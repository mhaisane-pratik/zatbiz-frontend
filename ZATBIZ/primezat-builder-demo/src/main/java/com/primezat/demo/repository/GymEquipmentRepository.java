package com.primezat.demo.repository;

import com.primezat.demo.model.GymEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymEquipmentRepository extends JpaRepository<GymEquipment, Long> {
    List<GymEquipment> findByProjectId(Long projectId);
}
