package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "medical_shop_product")
public class MedicalShopProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String name;
    private String brand;
    private String genericName;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String uses;

    @Column(length = 1000)
    private String dosage;

    @Column(length = 1000)
    private String ingredients;

    @Column(length = 1000)
    private String sideEffects;

    @Column(length = 1000)
    private String warnings;

    @Column(length = 1000)
    private String storageInstructions;

    private String expiryInformation;
    private Double price;
    private Integer discount;
    private String stockStatus;
    private Integer stockCount;
    private Double rating;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    private Boolean prescriptionRequired = false;
    private String category;

    public MedicalShopProduct() {
    }

    public MedicalShopProduct(Long projectId, String name, String brand, String genericName, String description, String uses, String dosage, String ingredients, String sideEffects, String warnings, String storageInstructions, String expiryInformation, Double price, Integer discount, String stockStatus, Integer stockCount, Double rating, String imageUrl, Boolean prescriptionRequired, String category) {
        this.projectId = projectId;
        this.name = name;
        this.brand = brand;
        this.genericName = genericName;
        this.description = description;
        this.uses = uses;
        this.dosage = dosage;
        this.ingredients = ingredients;
        this.sideEffects = sideEffects;
        this.warnings = warnings;
        this.storageInstructions = storageInstructions;
        this.expiryInformation = expiryInformation;
        this.price = price;
        this.discount = discount;
        this.stockStatus = stockStatus;
        this.stockCount = stockCount;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.prescriptionRequired = prescriptionRequired;
        this.category = category;
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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getGenericName() {
        return genericName;
    }

    public void setGenericName(String genericName) {
        this.genericName = genericName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUses() {
        return uses;
    }

    public void setUses(String uses) {
        this.uses = uses;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(String sideEffects) {
        this.sideEffects = sideEffects;
    }

    public String getWarnings() {
        return warnings;
    }

    public void setWarnings(String warnings) {
        this.warnings = warnings;
    }

    public String getStorageInstructions() {
        return storageInstructions;
    }

    public void setStorageInstructions(String storageInstructions) {
        this.storageInstructions = storageInstructions;
    }

    public String getExpiryInformation() {
        return expiryInformation;
    }

    public void setExpiryInformation(String expiryInformation) {
        this.expiryInformation = expiryInformation;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(String stockStatus) {
        this.stockStatus = stockStatus;
    }

    public Integer getStockCount() {
        return stockCount;
    }

    public void setStockCount(Integer stockCount) {
        this.stockCount = stockCount;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getPrescriptionRequired() {
        return prescriptionRequired;
    }

    public void setPrescriptionRequired(Boolean prescriptionRequired) {
        this.prescriptionRequired = prescriptionRequired;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
