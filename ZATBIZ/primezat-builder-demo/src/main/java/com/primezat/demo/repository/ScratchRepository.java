package com.primezat.demo.repository;

import com.primezat.demo.model.Scratch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScratchRepository extends JpaRepository<Scratch, Long> {
    Optional<Scratch> findByProjectId(Long projectId);
}
