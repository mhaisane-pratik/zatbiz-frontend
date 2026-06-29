package com.primezat.demo.repository;

import com.primezat.demo.model.MedicalShopProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalShopProductRepository extends JpaRepository<MedicalShopProduct, Long> {
    List<MedicalShopProduct> findByProjectId(Long projectId);
}
