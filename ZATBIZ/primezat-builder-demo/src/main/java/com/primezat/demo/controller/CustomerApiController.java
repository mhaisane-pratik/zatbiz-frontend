package com.primezat.demo.controller;

import com.primezat.demo.model.Customer;
import com.primezat.demo.model.User;
import com.primezat.demo.repository.CustomerRepository;
import com.primezat.demo.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerApiController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    // Register customer for a specific business website
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");

        if (email != null) {
            email = email.trim().toLowerCase();
        }
        String projectIdStr = request.get("projectId");
        String phone = request.get("phone");
        String address = request.get("address");

        if (name == null || name.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty() ||
            projectIdStr == null || projectIdStr.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Required fields: name, email, password, projectId");
            return ResponseEntity.badRequest().body(error);
        }

        Long projectId = Long.parseLong(projectIdStr);

        // Check if customer email already exists for this project
        if (customerRepository.findByProjectIdAndEmail(projectId, email.trim()).isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email is already registered for this business website!");
            return ResponseEntity.badRequest().body(error);
        }

        // Hash password
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

        Customer customer = new Customer(projectId, name.trim(), email.trim(), hashedPassword, phone, address);
        customer.setStatus("Customer"); // Default status is Customer
        Customer saved = customerRepository.save(customer);

        Map<String, Object> response = new HashMap<>();
        response.put("id", saved.getId());
        response.put("name", saved.getName());
        response.put("email", saved.getEmail());
        response.put("phone", saved.getPhone());
        response.put("address", saved.getAddress());
        response.put("projectId", saved.getProjectId());

        return ResponseEntity.ok(response);
    }

    // Login customer/staff for a specific business website
    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email != null) {
            email = email.trim().toLowerCase();
        }
        String projectIdStr = request.get("projectId");

        if (email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty() ||
            projectIdStr == null || projectIdStr.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Required fields: email, password, projectId");
            return ResponseEntity.badRequest().body(error);
        }

        Long projectId = Long.parseLong(projectIdStr);
        Optional<Customer> optionalCustomer = customerRepository.findByProjectIdAndEmail(projectId, email.trim());

        if (optionalCustomer.isEmpty()) {
            // Check if it's a staff/builder user logging into their store staff portal
            Optional<User> optionalUser = userRepository.findByEmail(email.trim());
            if (optionalUser.isPresent() && BCrypt.checkpw(password, optionalUser.get().getPassword())) {
                User user = optionalUser.get();
                Map<String, Object> response = new HashMap<>();
                response.put("id", -1L); // -1 represents Staff/Owner
                response.put("name", "Staff (" + user.getUsername() + ")");
                response.put("email", user.getEmail());
                response.put("phone", "N/A");
                response.put("address", "ZatBiz Core Staff Console");
                response.put("projectId", projectId);
                return ResponseEntity.ok(response);
            }
            
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password!");
            return ResponseEntity.status(401).body(error);
        }

        if (!BCrypt.checkpw(password, optionalCustomer.get().getPassword())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password!");
            return ResponseEntity.status(401).body(error);
        }

        Customer customer = optionalCustomer.get();
        Map<String, Object> response = new HashMap<>();
        response.put("id", customer.getId());
        response.put("name", customer.getName());
        response.put("email", customer.getEmail());
        response.put("phone", customer.getPhone());
        response.put("address", customer.getAddress());
        response.put("projectId", customer.getProjectId());

        return ResponseEntity.ok(response);
    }

    // Get all customers for a project (CRM leads)
    @GetMapping
    public ResponseEntity<List<Customer>> getCustomers(@RequestParam Long projectId) {
        List<Customer> customers = customerRepository.findByProjectId(projectId);
        return ResponseEntity.ok(customers);
    }

    // Create a customer directly (e.g. from CRM dashboard)
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        if (customer.getPassword() == null || customer.getPassword().isEmpty()) {
            customer.setPassword(BCrypt.hashpw("default123", BCrypt.gensalt()));
        }
        Customer saved = customerRepository.save(customer);
        return ResponseEntity.ok(saved);
    }

    // Update customer profile
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Customer customer = optionalCustomer.get();
        if (request.containsKey("name")) customer.setName(request.get("name"));
        if (request.containsKey("phone")) customer.setPhone(request.get("phone"));
        if (request.containsKey("address")) customer.setAddress(request.get("address"));
        if (request.containsKey("status")) customer.setStatus(request.get("status"));
        if (request.containsKey("password") && request.get("password") != null && !request.get("password").trim().isEmpty()) {
            customer.setPassword(BCrypt.hashpw(request.get("password"), BCrypt.gensalt()));
        }

        Customer saved = customerRepository.save(customer);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", saved.getId());
        response.put("name", saved.getName());
        response.put("email", saved.getEmail());
        response.put("phone", saved.getPhone());
        response.put("address", saved.getAddress());
        response.put("projectId", saved.getProjectId());
        response.put("status", saved.getStatus());
        
        return ResponseEntity.ok(response);
    }
}
