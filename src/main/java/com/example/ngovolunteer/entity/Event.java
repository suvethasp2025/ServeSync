package com.example.ngovolunteer.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    private LocalDate date;

    private int volunteerCapacity;

    public Event() {
    }

    public Event(String name, String location, LocalDate date, int volunteerCapacity) {
        this.name = name;
        this.location = location;
        this.date = date;
        this.volunteerCapacity = volunteerCapacity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getVolunteerCapacity() {
        return volunteerCapacity;
    }

    public void setVolunteerCapacity(int volunteerCapacity) {
        this.volunteerCapacity = volunteerCapacity;
    }
}