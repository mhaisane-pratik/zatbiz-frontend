package com.primezat.demo.controller;

import com.primezat.demo.model.Customer;
import com.primezat.demo.model.Reservation;
import com.primezat.demo.repository.CustomerRepository;
import com.primezat.demo.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationApiController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // Create a new reservation
    @PostMapping
    @Transactional
    public ResponseEntity<?> createReservation(@RequestBody Map<String, Object> request) {
        try {
            Long projectId = Long.parseLong(request.get("projectId").toString());
            String customerName = (String) request.get("customerName");
            String customerEmail = (String) request.get("customerEmail");
            String customerPhone = (String) request.get("customerPhone");
            String bookingDate = (String) request.get("bookingDate");
            String bookingTime = (String) request.get("bookingTime");
            Integer numberOfGuests = Integer.parseInt(request.get("numberOfGuests").toString());
            String tableNumber = (String) request.get("tableNumber");
            String notes = (String) request.get("notes");
            String status = request.get("status") != null ? (String) request.get("status") : "Pending";

            // CRM Sync: Find or create a customer profile
            if (customerEmail != null && !customerEmail.trim().isEmpty()) {
                Optional<Customer> existing = customerRepository.findByProjectIdAndEmail(projectId, customerEmail.trim());
                Customer customer;
                if (existing.isPresent()) {
                    customer = existing.get();
                } else {
                    customer = new Customer(
                        projectId,
                        customerName != null ? customerName.trim() : "Restaurant Guest",
                        customerEmail.trim(),
                        "", // No hashed password for guest leads
                        customerPhone,
                        ""
                    );
                    customer.setStatus("Lead");
                }

                // Update phone if provided
                if (customerPhone != null && !customerPhone.trim().isEmpty()) {
                    customer.setPhone(customerPhone);
                }
                customerRepository.save(customer);
            }

            Reservation reservation = new Reservation(
                projectId,
                customerName,
                customerEmail,
                customerPhone,
                bookingDate,
                bookingTime,
                numberOfGuests,
                tableNumber,
                status,
                notes
            );

            Reservation saved = reservationRepository.save(reservation);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to create reservation: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // List all reservations for a project
    @GetMapping
    public ResponseEntity<List<Reservation>> getProjectReservations(@RequestParam Long projectId) {
        List<Reservation> reservations = reservationRepository.findByProjectId(projectId);
        return ResponseEntity.ok(reservations);
    }

    // List reservations for a specific customer email
    @GetMapping("/customer")
    public ResponseEntity<List<Reservation>> getCustomerReservations(
            @RequestParam Long projectId,
            @RequestParam String email) {
        List<Reservation> reservations = reservationRepository.findByProjectIdAndCustomerEmail(projectId, email);
        return ResponseEntity.ok(reservations);
    }

    // Update reservation status (Confirmed, Cancelled, etc.)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateReservationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        if (status == null || status.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Status field is required");
            return ResponseEntity.badRequest().body(error);
        }

        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Reservation reservation = optionalReservation.get();
        reservation.setStatus(status.trim());
        Reservation updated = reservationRepository.save(reservation);
        return ResponseEntity.ok(updated);
    }

    // Update entire reservation details
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReservation(
            @PathVariable Long id,
            @RequestBody Reservation updatedData) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Reservation existing = optionalReservation.get();
        existing.setCustomerName(updatedData.getCustomerName());
        existing.setCustomerEmail(updatedData.getCustomerEmail());
        existing.setCustomerPhone(updatedData.getCustomerPhone());
        existing.setBookingDate(updatedData.getBookingDate());
        existing.setBookingTime(updatedData.getBookingTime());
        existing.setNumberOfGuests(updatedData.getNumberOfGuests());
        existing.setTableNumber(updatedData.getTableNumber());
        existing.setNotes(updatedData.getNotes());
        if (updatedData.getStatus() != null) {
            existing.setStatus(updatedData.getStatus());
        }

        Reservation saved = reservationRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    // Delete a reservation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        Optional<Reservation> optional = reservationRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        reservationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
