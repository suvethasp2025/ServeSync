package com.example.ngovolunteer.service;

import com.example.ngovolunteer.entity.Volunteer;
import com.example.ngovolunteer.repository.VolunteerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;

    public VolunteerService(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    public Optional<Volunteer> getVolunteerById(Long id) {
        return volunteerRepository.findById(id);
    }

    public Volunteer createVolunteer(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public Volunteer updateVolunteer(Long id, Volunteer volunteerDetails) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setName(volunteerDetails.getName());
        volunteer.setEmail(volunteerDetails.getEmail());
        volunteer.setPhone(volunteerDetails.getPhone());

        return volunteerRepository.save(volunteer);
    }

    public void deleteVolunteer(Long id) {
        volunteerRepository.deleteById(id);
    }
}