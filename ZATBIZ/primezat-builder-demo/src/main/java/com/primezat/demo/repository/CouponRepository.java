package com.primezat.demo.repository;

import com.primezat.demo.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findByProjectId(Long projectId);
    Optional<Coupon> findByProjectIdAndCode(Long projectId, String code);
}
