package com.hiagorios.devlog.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hiagorios.devlog.dto.SaveActivityDTO;
import com.hiagorios.devlog.model.Activity;
import com.hiagorios.devlog.service.ActivityService;

@RestController
@RequestMapping("/activities")
public class ActivityController {

  private final ActivityService service;

  ActivityController(ActivityService service) {
    this.service = service;
  }

  @GetMapping
  public List<Activity> list(@RequestParam(value = "description", defaultValue = "") String description) {
    return service.list(description);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public Activity save(@RequestBody SaveActivityDTO newActivity) {
    return service.save(newActivity);
  }
}