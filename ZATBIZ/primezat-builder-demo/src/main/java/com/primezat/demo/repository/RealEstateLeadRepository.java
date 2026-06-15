package com.primezat.demo.repository;

import com.primezat.demo.model.RealEstateLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RealEstateLeadRepository extends JpaRepository<RealEstateLead, Long> {
    List<RealEstateLead> findByProjectId(Long projectId);
}
