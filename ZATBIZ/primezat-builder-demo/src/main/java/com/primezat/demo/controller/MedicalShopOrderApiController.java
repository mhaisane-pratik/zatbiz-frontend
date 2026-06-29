package com.primezat.demo.controller;

import com.primezat.demo.model.MedicalShopOrder;
import com.primezat.demo.repository.MedicalShopOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medical-shop/orders")
@CrossOrigin(origins = "*")
public class MedicalShopOrderApiController {

    @Autowired
    private MedicalShopOrderRepository repository;

    @GetMapping
    public ResponseEntity<List<MedicalShopOrder>> getOrders(@RequestParam Long projectId) {
        return ResponseEntity.ok(repository.findByProjectId(projectId));
    }

    @GetMapping("/customer")
    public ResponseEntity<List<MedicalShopOrder>> getCustomerOrders(@RequestParam Long projectId, @RequestParam String email) {
        return ResponseEntity.ok(repository.findByProjectIdAndCustomerEmail(projectId, email));
    }

    @PostMapping
    public ResponseEntity<MedicalShopOrder> placeOrder(@RequestBody MedicalShopOrder order) {
        // If a prescription is required, keep it "Pending Prescription Verification"
        // Else, let it start as "Order Placed"
        if (order.getPrescriptionUrl() != null && !order.getPrescriptionUrl().trim().isEmpty()) {
            order.setStatus("Order Placed"); // Start tracking path
        } else {
            order.setStatus("Order Placed");
        }
        return ResponseEntity.ok(repository.save(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MedicalShopOrder> updateOrderStatus(@PathVariable Long id, @RequestBody MedicalShopOrder statusPayload) {
        Optional<MedicalShopOrder> opt = repository.findById(id);
        if (opt.isPresent()) {
            MedicalShopOrder order = opt.get();
            order.setStatus(statusPayload.getStatus());
            
            // Auto approve pharmacist verification if status is advanced past prescription verification
            if ("Prescription Verified".equalsIgnoreCase(statusPayload.getStatus()) ||
                "Packed".equalsIgnoreCase(statusPayload.getStatus()) ||
                "Shipped".equalsIgnoreCase(statusPayload.getStatus())) {
                order.setPharmacistVerified(true);
            }
            return ResponseEntity.ok(repository.save(order));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<MedicalShopOrder> verifyPrescription(@PathVariable Long id, @RequestParam boolean verified) {
        Optional<MedicalShopOrder> opt = repository.findById(id);
        if (opt.isPresent()) {
            MedicalShopOrder order = opt.get();
            order.setPharmacistVerified(verified);
            if (verified) {
                order.setStatus("Prescription Verified");
            } else {
                order.setStatus("Prescription Rejected");
            }
            return ResponseEntity.ok(repository.save(order));
        }
        return ResponseEntity.notFound().build();
    }
}
