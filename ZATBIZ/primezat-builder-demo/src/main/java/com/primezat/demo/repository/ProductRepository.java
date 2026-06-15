package com.primezat.demo.repository;

import com.primezat.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByProjectId(Long projectId);
    
    @Transactional
    void deleteByProjectId(Long projectId);
}

