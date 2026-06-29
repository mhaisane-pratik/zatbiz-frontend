package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_billing")
public class EventBilling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String type; // payment, invoice, expense, quotation, coupon
    private Double amount;
    private String date;
    private String status;
    
    @Column(columnDefinition = "TEXT")
    private String detailsJson; // JSON for item lists, discount codes, tax configurations, etc.

    public EventBilling() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getAmount() { return amount != null ? String.valueOf(amount) : null; }
    
    public Double getAmountValue() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDetailsJson() { return detailsJson; }
    public void setDetailsJson(String detailsJson) { this.detailsJson = detailsJson; }
}
