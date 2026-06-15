package com.primezat.demo.repository;

import com.primezat.demo.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByProjectId(Long projectId);
    Optional<Customer> findByProjectIdAndEmail(Long projectId, String email);
}




