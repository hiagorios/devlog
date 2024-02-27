package com.hiagorios.devlog.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hiagorios.devlog.model.Activity;

public interface ActivityRepository extends CrudRepository<Activity, Long> {

    List<Activity> findDistinctByDescriptionContainingIgnoreCase(String description);

    Optional<Activity> findByDescriptionAndDateCreatedBetween(String description, LocalDateTime start,
            LocalDateTime end);
}
