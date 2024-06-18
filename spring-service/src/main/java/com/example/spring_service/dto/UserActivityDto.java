package com.example.spring_service.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserActivityDto {
  private Long id;
  private String activityDescription;
  private LocalDateTime timestamp;
  private String username;
  private String email;

  public UserActivityDto(Long id, String activityDescription, LocalDateTime timestamp, String username, String email) {
    this.id = id;
    this.activityDescription = activityDescription;
    this.timestamp = timestamp;
    this.username = username;
    this.email = email;
  }

}
