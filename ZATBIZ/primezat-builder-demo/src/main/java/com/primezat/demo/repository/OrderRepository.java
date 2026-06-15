package com.primezat.demo.repository;

import com.primezat.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByProjectId(Long projectId);
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByProjectIdAndCustomerId(Long projectId, Long customerId);
    long countByProjectId(Long projectId);
}



