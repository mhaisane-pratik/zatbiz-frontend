package com.primezat.demo.repository;

import com.primezat.demo.model.EventVendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventVendorRepository extends JpaRepository<EventVendor, Long> {
    List<EventVendor> findByProjectId(Long projectId);
}
