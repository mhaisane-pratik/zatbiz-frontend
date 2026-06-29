package com.primezat.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "gym_diet_plan")
public class GymDietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String memberEmail;

    @Column(length = 2000)
    private String dietChart; // breakfast, lunch, dinner details
    
    private String waterGoal;

    public GymDietPlan() {
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

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public String getDietChart() {
        return dietChart;
    }

    public void setDietChart(String dietChart) {
        this.dietChart = dietChart;
    }

    public String getWaterGoal() {
        return waterGoal;
    }

    public void setWaterGoal(String waterGoal) {
        this.waterGoal = waterGoal;
    }
}
