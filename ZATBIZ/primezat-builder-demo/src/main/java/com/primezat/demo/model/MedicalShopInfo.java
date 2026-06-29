package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "medical_shop_info")
public class MedicalShopInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String subcategory;
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
    private String selectedTheme;
    private String selectedHomepageLayout;
    private String selectedLoginLayout;
    private String selectedDashboardLayout;

    public MedicalShopInfo() {
    }

    public MedicalShopInfo(Long projectId, String subcategory, String companyName, String businessName, String companyDescription, String ownerName, String mobileNo, String email, String city, String state, String country, String pincode, String logoUrl, String themeColor, String selectedTheme, String selectedHomepageLayout, String selectedLoginLayout, String selectedDashboardLayout) {
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
        this.selectedTheme = selectedTheme;
        this.selectedHomepageLayout = selectedHomepageLayout;
        this.selectedLoginLayout = selectedLoginLayout;
        this.selectedDashboardLayout = selectedDashboardLayout;
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

    public String getSelectedTheme() {
        return selectedTheme;
    }

    public void setSelectedTheme(String selectedTheme) {
        this.selectedTheme = selectedTheme;
    }

    public String getSelectedHomepageLayout() {
        return selectedHomepageLayout;
    }

    public void setSelectedHomepageLayout(String selectedHomepageLayout) {
        this.selectedHomepageLayout = selectedHomepageLayout;
    }

    public String getSelectedLoginLayout() {
        return selectedLoginLayout;
    }

    public void setSelectedLoginLayout(String selectedLoginLayout) {
        this.selectedLoginLayout = selectedLoginLayout;
    }

    public String getSelectedDashboardLayout() {
        return selectedDashboardLayout;
    }

    public void setSelectedDashboardLayout(String selectedDashboardLayout) {
        this.selectedDashboardLayout = selectedDashboardLayout;
    }
}
