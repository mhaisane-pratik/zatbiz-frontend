package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "gym_member")
public class GymMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String email;
    private String name;
    private String phone;
    private String emergencyContactName;
    private String emergencyContactPhone;

    @Column(length = 1000)
    private String medicalInformation;
    
    @Column(columnDefinition = "TEXT")
    private String profilePhotoUrl;
    
    private String membershipPlan;
    private String membershipStatus; // Active, Expired, Frozen
    private String expiryDate;
    
    private Double currentWeight;
    private Double height;
    private Double bmi;
    
    @Column(length = 1000)
    private String bodyMeasurements; // chest, waist, biceps JSON
    
    @Column(columnDefinition = "TEXT")
    private String progressPhotos; // comma-separated URLs or JSON array

    private Long assignedTrainerId;
    private String assignedTrainerName;

    public GymMember() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public void setEmergencyContactPhone(String emergencyContactPhone) {
        this.emergencyContactPhone = emergencyContactPhone;
    }

    public String getMedicalInformation() {
        return medicalInformation;
    }

    public void setMedicalInformation(String medicalInformation) {
        this.medicalInformation = medicalInformation;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public String getMembershipPlan() {
        return membershipPlan;
    }

    public void setMembershipPlan(String membershipPlan) {
        this.membershipPlan = membershipPlan;
    }

    public String getMembershipStatus() {
        return membershipStatus;
    }

    public void setMembershipStatus(String membershipStatus) {
        this.membershipStatus = membershipStatus;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Double getCurrentWeight() {
        return currentWeight;
    }

    public void setCurrentWeight(Double currentWeight) {
        this.currentWeight = currentWeight;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public String getBodyMeasurements() {
        return bodyMeasurements;
    }

    public void setBodyMeasurements(String bodyMeasurements) {
        this.bodyMeasurements = bodyMeasurements;
    }

    public String getProgressPhotos() {
        return progressPhotos;
    }

    public void setProgressPhotos(String progressPhotos) {
        this.progressPhotos = progressPhotos;
    }

    public Long getAssignedTrainerId() {
        return assignedTrainerId;
    }

    public void setAssignedTrainerId(Long assignedTrainerId) {
        this.assignedTrainerId = assignedTrainerId;
    }

    public String getAssignedTrainerName() {
        return assignedTrainerName;
    }

    public void setAssignedTrainerName(String assignedTrainerName) {
        this.assignedTrainerName = assignedTrainerName;
    }
}
