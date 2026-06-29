package com.primezat.demo.repository;

import com.primezat.demo.model.GymClassBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymClassBookingRepository extends JpaRepository<GymClassBooking, Long> {
    List<GymClassBooking> findByProjectId(Long projectId);
    List<GymClassBooking> findByProjectIdAndMemberEmail(Long projectId, String memberEmail);
}
