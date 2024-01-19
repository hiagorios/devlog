package com.hiagorios.devlog.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;
    private Integer minutesSpent;

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getMinutesSpent() {
        return minutesSpent;
    }
    
    public void setMinutesSpent(Integer minutesSpent) {
        this.minutesSpent = minutesSpent;
    }

}
