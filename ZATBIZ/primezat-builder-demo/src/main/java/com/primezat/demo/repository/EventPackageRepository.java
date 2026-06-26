package com.primezat.demo.repository;

import com.primezat.demo.model.EventPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventPackageRepository extends JpaRepository<EventPackage, Long> {
    List<EventPackage> findByProjectId(Long projectId);
}
