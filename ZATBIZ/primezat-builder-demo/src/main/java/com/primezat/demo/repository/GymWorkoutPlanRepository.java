package com.primezat.demo.repository;

import com.primezat.demo.model.GymWorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymWorkoutPlanRepository extends JpaRepository<GymWorkoutPlan, Long> {
    List<GymWorkoutPlan> findByProjectId(Long projectId);
    List<GymWorkoutPlan> findByProjectIdAndMemberEmail(Long projectId, String memberEmail);
}
