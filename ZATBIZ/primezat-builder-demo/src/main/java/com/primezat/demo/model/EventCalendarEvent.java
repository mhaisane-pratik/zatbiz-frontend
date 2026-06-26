package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_calendar_event")
public class EventCalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private String startDateTime;
    private String endDateTime;
    private String type; // Upcoming Events, Today's Events, Monthly Calendar, Staff Availability

    public EventCalendarEvent() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStartDateTime() { return startDateTime; }
    public void setStartDateTime(String startDateTime) { this.startDateTime = startDateTime; }

    public String getEndDateTime() { return endDateTime; }
    public void setEndDateTime(String endDateTime) { this.endDateTime = endDateTime; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
