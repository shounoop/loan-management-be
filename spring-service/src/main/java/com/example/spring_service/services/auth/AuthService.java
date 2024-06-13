package com.example.spring_service.services.auth;

import java.util.List;

import com.example.spring_service.dto.UserDto;

import io.jsonwebtoken.io.IOException;

public interface AuthService {
  boolean updateUser(Long id, UserDto userDto) throws IOException;

  List<UserDto> getAllUsers();

  boolean deleteUser(Long id);
}
