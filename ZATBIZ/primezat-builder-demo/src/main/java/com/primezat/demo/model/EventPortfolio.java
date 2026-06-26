package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_portfolio")
public class EventPortfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String title;
    
    @Column(length = 2000)
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    
    private String category;
    private String eventDate;
    
    @Column(columnDefinition = "TEXT")
    private String clientStory;

    public EventPortfolio() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public String getClientStory() { return clientStory; }
    public void setClientStory(String clientStory) { this.clientStory = clientStory; }
}
