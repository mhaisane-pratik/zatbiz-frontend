package com.primezat.demo.repository;

import com.primezat.demo.model.GymExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymExpenseRepository extends JpaRepository<GymExpense, Long> {
    List<GymExpense> findByProjectId(Long projectId);
}
