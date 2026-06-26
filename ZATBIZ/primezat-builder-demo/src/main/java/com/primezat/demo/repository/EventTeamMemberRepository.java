package com.primezat.demo.repository;

import com.primezat.demo.model.EventTeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventTeamMemberRepository extends JpaRepository<EventTeamMember, Long> {
    List<EventTeamMember> findByProjectId(Long projectId);
}
