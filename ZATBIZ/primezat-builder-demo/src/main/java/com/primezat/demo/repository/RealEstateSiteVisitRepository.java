package com.primezat.demo.repository;

import com.primezat.demo.model.RealEstateSiteVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RealEstateSiteVisitRepository extends JpaRepository<RealEstateSiteVisit, Long> {
    List<RealEstateSiteVisit> findByProjectId(Long projectId);
}
