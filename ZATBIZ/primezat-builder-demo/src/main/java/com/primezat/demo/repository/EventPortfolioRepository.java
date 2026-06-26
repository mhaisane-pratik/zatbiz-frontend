package com.primezat.demo.repository;

import com.primezat.demo.model.EventPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventPortfolioRepository extends JpaRepository<EventPortfolio, Long> {
    List<EventPortfolio> findByProjectId(Long projectId);
}
