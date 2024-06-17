package com.example.spring_service.services.auth;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.spring_service.dto.UserDto;
import com.example.spring_service.models.ERole;
import com.example.spring_service.models.Role;
import com.example.spring_service.models.User;
import com.example.spring_service.repository.RoleRepository;
import com.example.spring_service.repository.UserRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Override
  public boolean updateUser(Long id, UserDto userDto) throws IOException {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent()) {
      User existingUser = optionalUser.get();

      existingUser.setUsername(userDto.getUsername());
      existingUser.setEmail(userDto.getEmail());

      if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
        existingUser.setPassword(encoder.encode(userDto.getPassword()));
      }

      Set<String> strRoles = userDto.getRole();
      Set<Role> roles = new HashSet<>();

      if (strRoles == null) {
        Role userRole = roleRepository.findByName(ERole.ADMIN)
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
      } else {
        strRoles.forEach(role -> {
          switch (role) {
            case "SUPER_ADMIN":
              Role adminRole = roleRepository.findByName(ERole.SUPER_ADMIN)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(adminRole);

              break;
            case "ADMIN":
              Role modRole = roleRepository.findByName(ERole.ADMIN)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(modRole);

              break;
            default:
              Role userRole = roleRepository.findByName(ERole.ADMIN)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(userRole);
          }
        });
      }

      existingUser.setRoles(roles);
      userRepository.save(existingUser);

      return true;
    }

    return false;
  }

  @Override
  public List<UserDto> getAllUsers() {
    return userRepository.findAll().stream().map(User::getUserDto).collect(Collectors.toList());

  }

  @Override
  public boolean deleteUser(Long id) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent()) {
      userRepository.delete(optionalUser.get());
      return true;
    }

    return false;
  }
}
