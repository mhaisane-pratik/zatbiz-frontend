package com.primezat.demo.repository;

import com.primezat.demo.model.GymAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymAttendanceRepository extends JpaRepository<GymAttendance, Long> {
    List<GymAttendance> findByProjectId(Long projectId);
    List<GymAttendance> findByProjectIdAndMemberEmail(Long projectId, String memberEmail);
}
