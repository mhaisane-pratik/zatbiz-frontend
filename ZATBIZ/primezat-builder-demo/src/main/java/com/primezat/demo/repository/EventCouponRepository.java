package com.primezat.demo.repository;

import com.primezat.demo.model.EventCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventCouponRepository extends JpaRepository<EventCoupon, Long> {
    List<EventCoupon> findByProjectId(Long projectId);
}
