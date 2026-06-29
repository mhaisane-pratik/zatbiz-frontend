package com.primezat.demo.repository;

import com.primezat.demo.model.EventCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventCustomerRepository extends JpaRepository<EventCustomer, Long> {
    List<EventCustomer> findByProjectId(Long projectId);
    List<EventCustomer> findByProjectIdAndType(Long projectId, String type);
}
