package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_catalog")
public class EventCatalog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String type; // service, package, portfolio, gallery, category, testimonial, blog, faq, team_member, vendor
    private String title;
    private String subtitle;
    
    @Column(length = 2000)
    private String description;
    
    private Double price;
    
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    
    @Column(columnDefinition = "TEXT")
    private String dataJson; // for dynamic type-specific fields

    public EventCatalog() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDataJson() { return dataJson; }
    public void setDataJson(String dataJson) { this.dataJson = dataJson; }
}
