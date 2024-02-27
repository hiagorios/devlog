package com.hiagorios.devlog.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.hiagorios.devlog.dto.SaveActivityDTO;
import com.hiagorios.devlog.model.Activity;
import com.hiagorios.devlog.repository.ActivityRepository;

import jakarta.validation.Valid;

@Component
public class ActivityService {

    private final ActivityRepository repository;

    public ActivityService(ActivityRepository repository) {
        this.repository = repository;
    }

    public List<Activity> list(String description) {
        return repository.findDistinctByDescriptionContainingIgnoreCase(description);
    }

    public Activity save(@Valid SaveActivityDTO dto) {
        Activity activity = findSameOnDay(dto.description).orElse(new Activity(dto.description, 0));

        Integer newTimeSpent = activity.getMinutesSpent() + dto.minutesSpent;
        activity.setMinutesSpent(newTimeSpent);
        return repository.save(activity);
    }

    private Optional<Activity> findSameOnDay(String description) {
        LocalDate now = LocalDate.now();
        LocalDateTime startOfDay = now.atStartOfDay();
        LocalDateTime endOfDay = now.atTime(LocalTime.MAX);
        return repository.findByDescriptionAndDateCreatedBetween(description, startOfDay, endOfDay);
    }
}
