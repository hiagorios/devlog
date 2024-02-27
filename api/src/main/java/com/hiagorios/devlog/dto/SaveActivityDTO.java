package com.hiagorios.devlog.dto;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SaveActivityDTO implements Serializable {

    @NotBlank(message = "description is required")
    public String description;

    @NotNull(message = "minutesSpent is required")
    public Integer minutesSpent;

}
