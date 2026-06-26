package com.primezat.demo.repository;

import com.primezat.demo.model.EventGallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventGalleryRepository extends JpaRepository<EventGallery, Long> {
    List<EventGallery> findByProjectId(Long projectId);
}
