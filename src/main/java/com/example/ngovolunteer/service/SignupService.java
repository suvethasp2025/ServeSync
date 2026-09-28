package com.example.ngovolunteer.service;

import com.example.ngovolunteer.entity.Signup;
import com.example.ngovolunteer.repository.SignupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SignupService {

    private final SignupRepository signupRepository;

    public SignupService(SignupRepository signupRepository) {
        this.signupRepository = signupRepository;
    }

    public List<Signup> getAllSignups() {
        return signupRepository.findAll();
    }

    public Optional<Signup> getSignupById(Long id) {
        return signupRepository.findById(id);
    }

    public Signup createSignup(Signup signup) {
        return signupRepository.save(signup);
    }

    public Signup updateSignup(Long id, Signup signupDetails) {

        Signup signup = signupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Signup not found"));

        signup.setEventId(signupDetails.getEventId());
        signup.setVolunteerId(signupDetails.getVolunteerId());
        signup.setStatus(signupDetails.getStatus());

        return signupRepository.save(signup);
    }

    public void deleteSignup(Long id) {
        signupRepository.deleteById(id);
    }
}