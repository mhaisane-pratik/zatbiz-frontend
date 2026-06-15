package com.primezat.demo.repository;

import com.primezat.demo.model.RealEstateSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RealEstateSaleRepository extends JpaRepository<RealEstateSale, Long> {
    List<RealEstateSale> findByProjectId(Long projectId);
}
