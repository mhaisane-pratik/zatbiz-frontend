package com.primezat.demo.repository;

import com.primezat.demo.model.GymOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymOfferRepository extends JpaRepository<GymOffer, Long> {
    List<GymOffer> findByProjectId(Long projectId);
}
