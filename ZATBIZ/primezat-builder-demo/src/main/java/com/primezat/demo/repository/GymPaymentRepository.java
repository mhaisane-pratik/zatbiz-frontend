package com.primezat.demo.repository;

import com.primezat.demo.model.GymPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymPaymentRepository extends JpaRepository<GymPayment, Long> {
    List<GymPayment> findByProjectId(Long projectId);
    List<GymPayment> findByProjectIdAndMemberEmail(Long projectId, String memberEmail);
}
