package com.primezat.demo.repository;

import com.primezat.demo.model.RealEstateInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RealEstateInvoiceRepository extends JpaRepository<RealEstateInvoice, Long> {
    List<RealEstateInvoice> findByProjectId(Long projectId);
}
