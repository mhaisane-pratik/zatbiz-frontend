package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_booking")
public class EventBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String eventType;
    private String eventDate;
    private Double budget;
    private String location;
    private Integer guestsCount;
    
    @Column(length = 2000)
    private String message;
    
    private String status; // New, Contacted, Confirmed, Completed, Cancelled

    @Column(columnDefinition = "TEXT")
    private String checklistJson;
    
    @Column(columnDefinition = "TEXT")
    private String calendarJson;

    public EventBooking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getGuestsCount() { return guestsCount; }
    public void setGuestsCount(Integer guestsCount) { this.guestsCount = guestsCount; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getChecklistJson() { return checklistJson; }
    public void setChecklistJson(String checklistJson) { this.checklistJson = checklistJson; }

    public String getCalendarJson() { return calendarJson; }
    public void setCalendarJson(String calendarJson) { this.calendarJson = calendarJson; }
}
