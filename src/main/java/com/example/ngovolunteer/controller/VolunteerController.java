package com.example.ngovolunteer.controller;

import com.example.ngovolunteer.entity.Volunteer;
import com.example.ngovolunteer.service.VolunteerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@CrossOrigin(origins = "*")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return volunteerService.getAllVolunteers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(@PathVariable Long id) {

        return volunteerService.getVolunteerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Volunteer createVolunteer(@RequestBody Volunteer volunteer) {
        return volunteerService.createVolunteer(volunteer);
    }

    @PutMapping("/{id}")
    public Volunteer updateVolunteer(
            @PathVariable Long id,
            @RequestBody Volunteer volunteer) {

        return volunteerService.updateVolunteer(id, volunteer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVolunteer(@PathVariable Long id) {

        volunteerService.deleteVolunteer(id);

        return ResponseEntity.noContent().build();
    }
}