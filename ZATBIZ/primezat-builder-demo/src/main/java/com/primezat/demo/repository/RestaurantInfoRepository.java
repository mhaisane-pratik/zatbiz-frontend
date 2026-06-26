package com.primezat.demo.repository;

import com.primezat.demo.model.RestaurantInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantInfoRepository extends JpaRepository<RestaurantInfo, Long> {
    Optional<RestaurantInfo> findByProjectId(Long projectId);
}
