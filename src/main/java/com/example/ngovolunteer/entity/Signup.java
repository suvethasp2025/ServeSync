package com.example.ngovolunteer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "signups")
public class Signup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;
    private Long volunteerId;
    private String status;

    public Signup() {
    }

    public Signup(Long eventId, Long volunteerId, String status) {
        this.eventId = eventId;
        this.volunteerId = volunteerId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Long getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(Long volunteerId) {
        this.volunteerId = volunteerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}