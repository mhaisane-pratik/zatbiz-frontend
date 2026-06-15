package com.primezat.demo.controller;

import com.primezat.demo.model.Customer;
import com.primezat.demo.model.Order;
import com.primezat.demo.model.Product;
import com.primezat.demo.repository.CustomerRepository;
import com.primezat.demo.repository.OrderRepository;
import com.primezat.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderApiController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // Place an order
    @PostMapping
    @Transactional
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, Object> request) {
        try {
            Long projectId = Long.parseLong(request.get("projectId").toString());
            String customerName = (String) request.get("customerName");
            String customerEmail = (String) request.get("customerEmail");
            String customerPhone = (String) request.get("customerPhone");
            String customerAddress = (String) request.get("customerAddress");
            
            String paymentMethod = (String) request.get("paymentMethod");
            String city = (String) request.get("city");
            String state = (String) request.get("state");
            String pincode = (String) request.get("pincode");
            
            Object itemsObj = request.get("items");
            String itemsJson = itemsObj instanceof String ? (String) itemsObj : objectMapper.writeValueAsString(itemsObj);
            
            Double subtotal = Double.parseDouble(request.get("subtotal").toString());
            Double tax = Double.parseDouble(request.get("tax").toString());
            Double total = Double.parseDouble(request.get("total").toString());
            
            String paymentGateway = request.get("paymentGateway") != null ? (String) request.get("paymentGateway") : "Stripe";
            String paymentStatus = request.get("paymentStatus") != null ? (String) request.get("paymentStatus") : "Paid";
            
            Long customerId = null;
            if (request.get("customerId") != null && !request.get("customerId").toString().isEmpty()) {
                customerId = Long.parseLong(request.get("customerId").toString());
            }

            // 1. CRM Integration: Find or create customer
            Customer customer = null;
            if (customerId != null) {
                customer = customerRepository.findById(customerId).orElse(null);
            }
            
            if (customer == null && customerEmail != null && !customerEmail.trim().isEmpty()) {
                Optional<Customer> existing = customerRepository.findByProjectIdAndEmail(projectId, customerEmail.trim());
                if (existing.isPresent()) {
                    customer = existing.get();
                } else {
                    // Auto-create a lead/customer profile
                    customer = new Customer(
                        projectId, 
                        customerName != null ? customerName.trim() : "Walk-in Customer",
                        customerEmail.trim(),
                        "", // No hashed password for guest leads
                        customerPhone,
                        customerAddress
                    );
                    customer.setStatus("Customer");
                }
            }

            if (customer != null) {
                customer.setTotalOrders(customer.getTotalOrders() + 1);
                customer.setTotalSpent(customer.getTotalSpent() + total);
                if (customerAddress != null && !customerAddress.trim().isEmpty()) {
                    customer.setAddress(customerAddress);
                }
                if (customerPhone != null && !customerPhone.trim().isEmpty()) {
                    customer.setPhone(customerPhone);
                }
                customer = customerRepository.save(customer);
                customerId = customer.getId();
            }

            // 2. Order persistence
            Order order = new Order();
            order.setProjectId(projectId);
            order.setCustomerId(customerId);
            order.setCustomerName(customerName);
            order.setCustomerEmail(customerEmail);
            order.setCustomerPhone(customerPhone);
            order.setCustomerAddress(customerAddress);
            order.setItemsJson(itemsJson);
            order.setSubtotal(subtotal);
            order.setTax(tax);
            order.setTotal(total);
            order.setPaymentGateway(paymentGateway);
            order.setPaymentStatus(paymentStatus);
            order.setPaymentMethod(paymentMethod);
            order.setCity(city);
            order.setState(state);
            order.setPincode(pincode);
            order.setStatus("Processing"); // Default status is Processing for paid orders

            // Save order first to get ID
            Order savedOrder = orderRepository.save(order);

            // Generate GST Invoice Number e.g. GST-2026-1004
            String invoiceNumber = "GST-2026-" + (1000 + savedOrder.getId());
            savedOrder.setInvoiceNumber(invoiceNumber);
            savedOrder = orderRepository.save(savedOrder);

            // 3. Inventory Stock Deduction Logic
            try {
                List<Map<String, Object>> itemsList = objectMapper.readValue(
                    itemsJson, 
                    new TypeReference<List<Map<String, Object>>>() {}
                );

                for (Map<String, Object> item : itemsList) {
                    if (item.get("id") != null) {
                        Long prodId = Long.parseLong(item.get("id").toString());
                        int qty = Integer.parseInt(item.get("quantity").toString());
                        
                        Optional<Product> optionalProduct = productRepository.findById(prodId);
                        if (optionalProduct.isPresent()) {
                            Product product = optionalProduct.get();
                            int currentStock = product.getStock() != null ? product.getStock() : 0;
                            int newStock = Math.max(0, currentStock - qty);
                            product.setStock(newStock);
                            productRepository.save(product);
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Inventory stock deduction warning: " + e.getMessage());
            }

            return ResponseEntity.ok(savedOrder);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to place order: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // List all orders for a project
    @GetMapping
    public ResponseEntity<List<Order>> getProjectOrders(@RequestParam Long projectId) {
        List<Order> orders = orderRepository.findByProjectId(projectId);
        return ResponseEntity.ok(orders);
    }

    // List orders for a specific customer
    @GetMapping("/customer")
    public ResponseEntity<List<Order>> getCustomerOrders(
            @RequestParam Long projectId, 
            @RequestParam Long customerId) {
        List<Order> orders = orderRepository.findByProjectIdAndCustomerId(projectId, customerId);
        return ResponseEntity.ok(orders);
    }

    // Update order status (ERP workflow)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        if (status == null || status.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Status field is required");
            return ResponseEntity.badRequest().body(error);
        }

        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Order order = optionalOrder.get();
        order.setStatus(status.trim());
        Order updated = orderRepository.save(order);
        return ResponseEntity.ok(updated);
    }
}
