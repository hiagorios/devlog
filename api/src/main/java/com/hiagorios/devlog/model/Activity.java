package com.hiagorios.devlog.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "description is required")
    private String description;

    @NotNull(message = "minutesSpent is required")
    private Integer minutesSpent = 0;

    @NotNull
    @JsonFormat(shape = Shape.STRING)
    private LocalDateTime dateCreated;

    public Activity() {
    }

    public Activity(String description, Integer minutesSpent) {
        this.description = description;
        this.minutesSpent = minutesSpent;
        this.dateCreated = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((dateCreated == null) ? 0 : dateCreated.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Activity other = (Activity) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (dateCreated == null) {
            if (other.dateCreated != null)
                return false;
        } else if (!dateCreated.equals(other.dateCreated))
            return false;
        return true;
    }

}
