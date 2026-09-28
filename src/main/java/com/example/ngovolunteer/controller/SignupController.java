package com.example.ngovolunteer.controller;

import com.example.ngovolunteer.entity.Signup;
import com.example.ngovolunteer.service.SignupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/signups")
@CrossOrigin(origins = "*")
public class SignupController {

    private final SignupService signupService;

    public SignupController(SignupService signupService) {
        this.signupService = signupService;
    }

    @GetMapping
    public List<Signup> getAllSignups() {
        return signupService.getAllSignups();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Signup> getSignupById(@PathVariable Long id) {

        return signupService.getSignupById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Signup createSignup(@RequestBody Signup signup) {
        return signupService.createSignup(signup);
    }

    @PutMapping("/{id}")
    public Signup updateSignup(
            @PathVariable Long id,
            @RequestBody Signup signup) {

        return signupService.updateSignup(id, signup);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSignup(@PathVariable Long id) {

        signupService.deleteSignup(id);

        return ResponseEntity.noContent().build();
    }
}