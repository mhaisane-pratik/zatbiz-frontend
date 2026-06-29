package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_customer")
public class EventCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String name;
    private String email;
    private String phone;
    private String address;
    
    @Column(length = 2000)
    private String notes;

    private String type; // customer, lead, contact, support, notification
    private String status; // Active, Lead, Resolved, Unread, etc.
    @Column(columnDefinition = "TEXT")
    private String messageJson; // JSON for dynamic fields (budget, inquiry details)

    public EventCustomer() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessageJson() { return messageJson; }
    public void setMessageJson(String messageJson) { this.messageJson = messageJson; }
}
