package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "real_estate_lead")
public class RealEstateLead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String name;
    private String mobile;
    private String email;
    private Double budget;

    @Column(length = 2000)
    private String message;

    private Long propertyId;
    private String propertyName;
    private Long assignedBrokerId;
    private String status;

    @Column(length = 2000)
    private String notes;

    private String createdDate;

    public RealEstateLead() {
    }

    public RealEstateLead(Long projectId, String name, String mobile, String email, Double budget, String message, Long propertyId, String propertyName, Long assignedBrokerId, String status, String notes, String createdDate) {
        this.projectId = projectId;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
        this.budget = budget;
        this.message = message;
        this.propertyId = propertyId;
        this.propertyName = propertyName;
        this.assignedBrokerId = assignedBrokerId;
        this.status = status;
        this.notes = notes;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }

    public Long getAssignedBrokerId() {
        return assignedBrokerId;
    }

    public void setAssignedBrokerId(Long assignedBrokerId) {
        this.assignedBrokerId = assignedBrokerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }
}
