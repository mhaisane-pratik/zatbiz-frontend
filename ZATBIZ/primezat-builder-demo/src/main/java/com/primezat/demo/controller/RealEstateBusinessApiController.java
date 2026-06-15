package com.primezat.demo.controller;

import com.primezat.demo.model.*;
import com.primezat.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/realestate")
@CrossOrigin(origins = "*")
public class RealEstateBusinessApiController {

    @Autowired
    private RealEstateBrokerRepository brokerRepository;

    @Autowired
    private RealEstateLeadRepository leadRepository;

    @Autowired
    private RealEstateSiteVisitRepository siteVisitRepository;

    @Autowired
    private RealEstateSaleRepository saleRepository;

    @Autowired
    private RealEstatePaymentRepository paymentRepository;

    @Autowired
    private RealEstateInvoiceRepository invoiceRepository;

    // --- Brokers Endpoints ---
    @GetMapping("/brokers")
    public List<RealEstateBroker> getBrokers(@RequestParam Long projectId) {
        return brokerRepository.findByProjectId(projectId);
    }

    @PostMapping("/brokers")
    public RealEstateBroker createBroker(@RequestBody RealEstateBroker broker) {
        return brokerRepository.save(broker);
    }

    @PutMapping("/brokers/{id}")
    public ResponseEntity<RealEstateBroker> updateBroker(@PathVariable Long id, @RequestBody RealEstateBroker updated) {
        if (!brokerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        return ResponseEntity.ok(brokerRepository.save(updated));
    }

    @DeleteMapping("/brokers/{id}")
    public ResponseEntity<Void> deleteBroker(@PathVariable Long id) {
        if (brokerRepository.existsById(id)) {
            brokerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- Leads Endpoints ---
    @GetMapping("/leads")
    public List<RealEstateLead> getLeads(@RequestParam Long projectId) {
        return leadRepository.findByProjectId(projectId);
    }

    @PostMapping("/leads")
    public RealEstateLead createLead(@RequestBody RealEstateLead lead) {
        return leadRepository.save(lead);
    }

    @PutMapping("/leads/{id}")
    public ResponseEntity<RealEstateLead> updateLead(@PathVariable Long id, @RequestBody RealEstateLead updated) {
        if (!leadRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        return ResponseEntity.ok(leadRepository.save(updated));
    }

    @DeleteMapping("/leads/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        if (leadRepository.existsById(id)) {
            leadRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- Site Visits Endpoints ---
    @GetMapping("/visits")
    public List<RealEstateSiteVisit> getVisits(@RequestParam Long projectId) {
        return siteVisitRepository.findByProjectId(projectId);
    }

    @PostMapping("/visits")
    public RealEstateSiteVisit createVisit(@RequestBody RealEstateSiteVisit visit) {
        return siteVisitRepository.save(visit);
    }

    @PutMapping("/visits/{id}")
    public ResponseEntity<RealEstateSiteVisit> updateVisit(@PathVariable Long id, @RequestBody RealEstateSiteVisit updated) {
        if (!siteVisitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        return ResponseEntity.ok(siteVisitRepository.save(updated));
    }

    @DeleteMapping("/visits/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        if (siteVisitRepository.existsById(id)) {
            siteVisitRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- Sales Endpoints ---
    @GetMapping("/sales")
    public List<RealEstateSale> getSales(@RequestParam Long projectId) {
        return saleRepository.findByProjectId(projectId);
    }

    @PostMapping("/sales")
    public RealEstateSale createSale(@RequestBody RealEstateSale sale) {
        return saleRepository.save(sale);
    }

    @PutMapping("/sales/{id}")
    public ResponseEntity<RealEstateSale> updateSale(@PathVariable Long id, @RequestBody RealEstateSale updated) {
        if (!saleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        return ResponseEntity.ok(saleRepository.save(updated));
    }

    @DeleteMapping("/sales/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        if (saleRepository.existsById(id)) {
            saleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- Payments Endpoints ---
    @GetMapping("/payments")
    public List<RealEstatePayment> getPayments(@RequestParam Long projectId) {
        return paymentRepository.findByProjectId(projectId);
    }

    @PostMapping("/payments")
    public RealEstatePayment createPayment(@RequestBody RealEstatePayment payment) {
        return paymentRepository.save(payment);
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<RealEstatePayment> updatePayment(@PathVariable Long id, @RequestBody RealEstatePayment updated) {
        if (!paymentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        return ResponseEntity.ok(paymentRepository.save(updated));
    }

    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- Invoices Endpoints ---
    @GetMapping("/invoices")
    public List<RealEstateInvoice> getInvoices(@RequestParam Long projectId) {
        return invoiceRepository.findByProjectId(projectId);
    }

    @PostMapping("/invoices")
    public RealEstateInvoice createInvoice(@RequestBody RealEstateInvoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @PutMapping("/invoices/{id}")
    public ResponseEntity<RealEstateInvoice> updateInvoice(@PathVariable Long id, @RequestBody RealEstateInvoice updated) {
        if (!invoiceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        updated.setId(id);
        return ResponseEntity.ok(invoiceRepository.save(updated));
    }

    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        if (invoiceRepository.existsById(id)) {
            invoiceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
