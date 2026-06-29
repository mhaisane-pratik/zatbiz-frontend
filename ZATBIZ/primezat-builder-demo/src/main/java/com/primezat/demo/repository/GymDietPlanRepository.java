package com.primezat.demo.repository;

import com.primezat.demo.model.GymDietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GymDietPlanRepository extends JpaRepository<GymDietPlan, Long> {
    List<GymDietPlan> findByProjectId(Long projectId);
    Optional<GymDietPlan> findByProjectIdAndMemberEmail(Long projectId, String memberEmail);
}
