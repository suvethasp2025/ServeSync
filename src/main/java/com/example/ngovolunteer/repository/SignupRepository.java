package com.example.ngovolunteer.repository;

import com.example.ngovolunteer.entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignupRepository extends JpaRepository<Signup, Long> {
}