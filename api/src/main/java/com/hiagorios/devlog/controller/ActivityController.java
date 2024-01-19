package com.hiagorios.devlog.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hiagorios.devlog.model.Activity;
import com.hiagorios.devlog.repository.ActivityRepository;

@RestController
@RequestMapping("/activities")
public class ActivityController {

  final ActivityRepository repository;

  ActivityController(ActivityRepository repository) {
    this.repository = repository;
  }
  
  @GetMapping
  public List<Activity> list(@RequestParam(value = "description", defaultValue = "") String description) {
    return repository.findDistinctByDescriptionContainingIgnoreCase(description);
  }

  @GetMapping("/{id}")
  public Activity findById(@RequestParam(value = "id", required = true) Long id) {
    // TODO handle activity not found
    return repository.findById(id).get();
  }
}