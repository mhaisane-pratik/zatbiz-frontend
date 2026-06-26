package com.primezat.demo.repository;

import com.primezat.demo.model.EventTestimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventTestimonialRepository extends JpaRepository<EventTestimonial, Long> {
    List<EventTestimonial> findByProjectId(Long projectId);
}
