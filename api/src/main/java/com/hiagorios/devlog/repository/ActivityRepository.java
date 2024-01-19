package com.hiagorios.devlog.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hiagorios.devlog.model.Activity;

public interface ActivityRepository extends CrudRepository<Activity, Long> {
    
    List<Activity> findDistinctByDescriptionContainingIgnoreCase(String description);
}
