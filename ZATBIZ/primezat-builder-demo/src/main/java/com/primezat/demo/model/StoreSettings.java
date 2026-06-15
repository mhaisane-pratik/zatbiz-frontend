package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "store_settings")
public class StoreSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;

    private String storeName;

    private String logoUrl;

    private Double taxRate = 18.0;

    private Double shippingFee = 0.0;

    private Boolean enableUpi = true;

    private Boolean enableCard = true;

    private Boolean enableCod = true;

    public StoreSettings() {
    }

    public StoreSettings(Long projectId, String storeName, String logoUrl, Double taxRate, Double shippingFee, Boolean enableUpi, Boolean enableCard, Boolean enableCod) {
        this.projectId = projectId;
        this.storeName = storeName;
        this.logoUrl = logoUrl;
        this.taxRate = taxRate != null ? taxRate : 18.0;
        this.shippingFee = shippingFee != null ? shippingFee : 0.0;
        this.enableUpi = enableUpi != null ? enableUpi : true;
        this.enableCard = enableCard != null ? enableCard : true;
        this.enableCod = enableCod != null ? enableCod : true;
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

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public Double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(Double taxRate) {
        this.taxRate = taxRate;
    }

    public Double getShippingFee() {
        return shippingFee;
    }

    public void setShippingFee(Double shippingFee) {
        this.shippingFee = shippingFee;
    }

    public Boolean getEnableUpi() {
        return enableUpi;
    }

    public void setEnableUpi(Boolean enableUpi) {
        this.enableUpi = enableUpi;
    }

    public Boolean getEnableCard() {
        return enableCard;
    }

    public void setEnableCard(Boolean enableCard) {
        this.enableCard = enableCard;
    }

    public Boolean getEnableCod() {
        return enableCod;
    }

    public void setEnableCod(Boolean enableCod) {
        this.enableCod = enableCod;
    }
}
