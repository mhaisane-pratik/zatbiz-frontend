package com.primezat.demo.repository;

import com.primezat.demo.model.EventExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventExpenseRepository extends JpaRepository<EventExpense, Long> {
    List<EventExpense> findByProjectId(Long projectId);
}
