package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_package")
public class EventPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String name;
    private Double price;
    
    @Column(length = 2000)
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String servicesIncluded; // Comma separated or simple list
    
    private String duration;

    public EventPackage() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getServicesIncluded() { return servicesIncluded; }
    public void setServicesIncluded(String servicesIncluded) { this.servicesIncluded = servicesIncluded; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}
