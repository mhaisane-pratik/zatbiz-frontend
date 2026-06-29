package com.primezat.demo.repository;

import com.primezat.demo.model.GymTrainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymTrainerRepository extends JpaRepository<GymTrainer, Long> {
    List<GymTrainer> findByProjectId(Long projectId);
}
