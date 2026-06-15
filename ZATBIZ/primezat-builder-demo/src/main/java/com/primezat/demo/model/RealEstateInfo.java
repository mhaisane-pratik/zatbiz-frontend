package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "real_estate_info")
public class RealEstateInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String niches;
    private String companyName;
    private String businessName;

    @Column(length = 2000)
    private String companyDescription;

    private String ownerName;
    private String mobileNo;
    private String email;
    private String whatsappNo;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String logoType;

    @Column(columnDefinition = "TEXT")
    private String logoUrl;

    @Column(columnDefinition = "TEXT")
    private String brandImageUrl;

    private String themeColor;

    public RealEstateInfo() {
    }

    public RealEstateInfo(Long projectId, String niches, String companyName, String businessName, String companyDescription, String ownerName, String mobileNo, String email, String whatsappNo, String city, String state, String country, String pincode, String logoType, String logoUrl, String brandImageUrl, String themeColor) {
        this.projectId = projectId;
        this.niches = niches;
        this.companyName = companyName;
        this.businessName = businessName;
        this.companyDescription = companyDescription;
        this.ownerName = ownerName;
        this.mobileNo = mobileNo;
        this.email = email;
        this.whatsappNo = whatsappNo;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.logoType = logoType;
        this.logoUrl = logoUrl;
        this.brandImageUrl = brandImageUrl;
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

    public String getNiches() {
        return niches;
    }

    public void setNiches(String niches) {
        this.niches = niches;
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

    public String getWhatsappNo() {
        return whatsappNo;
    }

    public void setWhatsappNo(String whatsappNo) {
        this.whatsappNo = whatsappNo;
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

    public String getLogoType() {
        return logoType;
    }

    public void setLogoType(String logoType) {
        this.logoType = logoType;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getBrandImageUrl() {
        return brandImageUrl;
    }

    public void setBrandImageUrl(String brandImageUrl) {
        this.brandImageUrl = brandImageUrl;
    }

    public String getThemeColor() {
        return themeColor;
    }

    public void setThemeColor(String themeColor) {
        this.themeColor = themeColor;
    }
}
