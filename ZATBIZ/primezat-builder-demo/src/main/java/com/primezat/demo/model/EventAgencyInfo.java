package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_agency_info")
public class EventAgencyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String companyName;
    private String ownerName;
    private String businessEmail;
    private String phone;
    private String whatsApp;
    private String businessAddress;
    private String city;
    private String state;
    private String country;
    
    @Column(columnDefinition = "TEXT")
    private String logoUrl;
    
    @Column(columnDefinition = "TEXT")
    private String coverImageUrl;
    
    private String workingHours;
    private String gstNumber;
    
    @Column(columnDefinition = "TEXT")
    private String socialMediaLinks; // JSON or comma-separated links

    // Consolidated Website Settings properties
    private String tagline;
    @Column(columnDefinition = "TEXT")
    private String aboutText;
    private String primaryColor;
    private String secondaryColor;

    // Consolidated SEO Settings properties
    private String seoTitle;
    @Column(columnDefinition = "TEXT")
    private String seoKeywords;
    @Column(columnDefinition = "TEXT")
    private String seoDescription;

    public EventAgencyInfo() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getBusinessEmail() { return businessEmail; }
    public void setBusinessEmail(String businessEmail) { this.businessEmail = businessEmail; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWhatsApp() { return whatsApp; }
    public void setWhatsApp(String whatsApp) { this.whatsApp = whatsApp; }

    public String getBusinessAddress() { return businessAddress; }
    public void setBusinessAddress(String businessAddress) { this.businessAddress = businessAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public String getWorkingHours() { return workingHours; }
    public void setWorkingHours(String workingHours) { this.workingHours = workingHours; }

    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }

    public String getSocialMediaLinks() { return socialMediaLinks; }
    public void setSocialMediaLinks(String socialMediaLinks) { this.socialMediaLinks = socialMediaLinks; }

    // Website Settings getters/setters
    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getAboutText() { return aboutText; }
    public void setAboutText(String aboutText) { this.aboutText = aboutText; }

    public String getPrimaryColor() { return primaryColor; }
    public void setPrimaryColor(String primaryColor) { this.primaryColor = primaryColor; }

    public String getSecondaryColor() { return secondaryColor; }
    public void setSecondaryColor(String secondaryColor) { this.secondaryColor = secondaryColor; }

    // SEO Settings getters/setters
    public String getSeoTitle() { return seoTitle; }
    public void setSeoTitle(String seoTitle) { this.seoTitle = seoTitle; }

    public String getSeoKeywords() { return seoKeywords; }
    public void setSeoKeywords(String seoKeywords) { this.seoKeywords = seoKeywords; }

    public String getSeoDescription() { return seoDescription; }
    public void setSeoDescription(String seoDescription) { this.seoDescription = seoDescription; }
}
