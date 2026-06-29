package com.primezat.demo.repository;

import com.primezat.demo.model.MedicalShopOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalShopOrderRepository extends JpaRepository<MedicalShopOrder, Long> {
    List<MedicalShopOrder> findByProjectId(Long projectId);
    List<MedicalShopOrder> findByProjectIdAndCustomerEmail(Long projectId, String customerEmail);
}
