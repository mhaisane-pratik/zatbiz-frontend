package com.primezat.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_shop_order")
public class MedicalShopOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;

    @Column(length = 1000)
    private String shippingAddress;

    private String deliverySlot;
    private String paymentMethod;

    @Column(columnDefinition = "TEXT")
    private String prescriptionUrl;

    @Column(length = 1000)
    private String doctorNotes;

    private Boolean pharmacistVerified = false;
    private String status = "Order Placed";

    @Column(columnDefinition = "TEXT")
    private String itemsJson;

    private Double subtotal;
    private Double deliveryCharges;
    private Double total;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public MedicalShopOrder() {
    }

    public MedicalShopOrder(Long projectId, String customerName, String customerEmail, String customerPhone, String shippingAddress, String deliverySlot, String paymentMethod, String prescriptionUrl, String doctorNotes, Boolean pharmacistVerified, String status, String itemsJson, Double subtotal, Double deliveryCharges, Double total) {
        this.projectId = projectId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.shippingAddress = shippingAddress;
        this.deliverySlot = deliverySlot;
        this.paymentMethod = paymentMethod;
        this.prescriptionUrl = prescriptionUrl;
        this.doctorNotes = doctorNotes;
        this.pharmacistVerified = pharmacistVerified;
        this.status = status;
        this.itemsJson = itemsJson;
        this.subtotal = subtotal;
        this.deliveryCharges = deliveryCharges;
        this.total = total;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getDeliverySlot() {
        return deliverySlot;
    }

    public void setDeliverySlot(String deliverySlot) {
        this.deliverySlot = deliverySlot;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPrescriptionUrl() {
        return prescriptionUrl;
    }

    public void setPrescriptionUrl(String prescriptionUrl) {
        this.prescriptionUrl = prescriptionUrl;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public Boolean getPharmacistVerified() {
        return pharmacistVerified;
    }

    public void setPharmacistVerified(Boolean pharmacistVerified) {
        this.pharmacistVerified = pharmacistVerified;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getItemsJson() {
        return itemsJson;
    }

    public void setItemsJson(String itemsJson) {
        this.itemsJson = itemsJson;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getDeliveryCharges() {
        return deliveryCharges;
    }

    public void setDeliveryCharges(Double deliveryCharges) {
        this.deliveryCharges = deliveryCharges;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
