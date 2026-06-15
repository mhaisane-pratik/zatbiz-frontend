package com.primezat.demo.repository;

import com.primezat.demo.model.RealEstatePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RealEstatePaymentRepository extends JpaRepository<RealEstatePayment, Long> {
    List<RealEstatePayment> findByProjectId(Long projectId);
}
