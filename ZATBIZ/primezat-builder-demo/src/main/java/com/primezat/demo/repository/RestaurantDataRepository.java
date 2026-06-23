package com.primezat.demo.repository;

import com.primezat.demo.model.RestaurantData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantDataRepository extends JpaRepository<RestaurantData, Long> {
    List<RestaurantData> findByProjectId(Long projectId);
    List<RestaurantData> findByProjectIdAndDataType(Long projectId, String dataType);
}
