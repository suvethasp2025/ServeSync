package com.example.ngovolunteer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance_records")
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;
    private Long volunteerId;
    private String attendanceStatus;

    public AttendanceRecord() {
    }

    public AttendanceRecord(Long eventId, Long volunteerId, String attendanceStatus) {
        this.eventId = eventId;
        this.volunteerId = volunteerId;
        this.attendanceStatus = attendanceStatus;
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

    public String getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(String attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }
}