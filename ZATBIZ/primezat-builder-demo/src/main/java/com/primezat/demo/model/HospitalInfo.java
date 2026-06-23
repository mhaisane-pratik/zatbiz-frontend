package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "hospital_info")
public class HospitalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    
    private String subcategory; // Multi-Speciality Hospital, Clinic, Dental Clinic, Eye Hospital, etc.
    
    private String companyName;
    
    private String businessName;

    @Column(length = 2000)
    private String companyDescription;

    private String ownerName;
    private String mobileNo;
    private String email;
    private String city;
    private String state;
    private String country;
    private String pincode;

    @Column(columnDefinition = "TEXT")
    private String logoUrl;

    private String themeColor;

    public HospitalInfo() {
    }

    public HospitalInfo(Long projectId, String subcategory, String companyName, String businessName, String companyDescription, String ownerName, String mobileNo, String email, String city, String state, String country, String pincode, String logoUrl, String themeColor) {
        this.projectId = projectId;
        this.subcategory = subcategory;
        this.companyName = companyName;
        this.businessName = businessName;
        this.companyDescription = companyDescription;
        this.ownerName = ownerName;
        this.mobileNo = mobileNo;
        this.email = email;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.logoUrl = logoUrl;
        this.themeColor = themeColor;
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

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getThemeColor() {
        return themeColor;
    }

    public void setThemeColor(String themeColor) {
        this.themeColor = themeColor;
    }
}
