package com.primezat.demo.repository;

import com.primezat.demo.model.RealEstateBroker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RealEstateBrokerRepository extends JpaRepository<RealEstateBroker, Long> {
    List<RealEstateBroker> findByProjectId(Long projectId);
}
