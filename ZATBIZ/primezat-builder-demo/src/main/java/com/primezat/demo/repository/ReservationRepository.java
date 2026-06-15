package com.primezat.demo.repository;

import com.primezat.demo.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByProjectId(Long projectId);

    List<Reservation> findByProjectIdAndCustomerEmail(Long projectId, String customerEmail);

    @Transactional
    void deleteByProjectId(Long projectId);
}
