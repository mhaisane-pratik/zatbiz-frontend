package com.primezat.demo.repository;

import com.primezat.demo.model.GymMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GymMemberRepository extends JpaRepository<GymMember, Long> {
    List<GymMember> findByProjectId(Long projectId);
    Optional<GymMember> findByProjectIdAndEmail(Long projectId, String email);
}
