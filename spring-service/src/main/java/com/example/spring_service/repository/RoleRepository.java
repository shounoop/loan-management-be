package com.example.spring_service.repository;

import java.util.Optional;

import com.example.spring_service.models.ERole;
import com.example.spring_service.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
