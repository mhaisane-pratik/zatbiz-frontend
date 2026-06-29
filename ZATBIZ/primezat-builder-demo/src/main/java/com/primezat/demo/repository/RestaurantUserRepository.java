package com.primezat.demo.repository;

import com.primezat.demo.model.RestaurantUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantUserRepository extends JpaRepository<RestaurantUser, Long> {
    List<RestaurantUser> findByProjectId(Long projectId);
    Optional<RestaurantUser> findByProjectIdAndEmail(Long projectId, String email);
}
