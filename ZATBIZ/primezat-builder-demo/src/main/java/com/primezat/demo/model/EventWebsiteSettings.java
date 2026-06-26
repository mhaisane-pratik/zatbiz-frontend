package com.primezat.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_website_settings")
public class EventWebsiteSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String themeName;
    
    @Column(columnDefinition = "TEXT")
    private String customCss;
    
    private String headerLayout;
    private String footerLayout;

    public EventWebsiteSettings() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getThemeName() { return themeName; }
    public void setThemeName(String themeName) { this.themeName = themeName; }

    public String getCustomCss() { return customCss; }
    public void setCustomCss(String customCss) { this.customCss = customCss; }

    public String getHeaderLayout() { return headerLayout; }
    public void setHeaderLayout(String headerLayout) { this.headerLayout = headerLayout; }

    public String getFooterLayout() { return footerLayout; }
    public void setFooterLayout(String footerLayout) { this.footerLayout = footerLayout; }
}
