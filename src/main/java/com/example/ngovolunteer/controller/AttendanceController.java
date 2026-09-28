package com.example.ngovolunteer.controller;

import com.example.ngovolunteer.entity.AttendanceRecord;
import com.example.ngovolunteer.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public List<AttendanceRecord> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceRecord> getAttendanceById(
            @PathVariable Long id) {

        return attendanceService.getAttendanceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public AttendanceRecord createAttendance(
            @RequestBody AttendanceRecord attendanceRecord) {

        return attendanceService.createAttendance(attendanceRecord);
    }

    @PutMapping("/{id}")
    public AttendanceRecord updateAttendance(
            @PathVariable Long id,
            @RequestBody AttendanceRecord attendanceRecord) {

        return attendanceService.updateAttendance(id, attendanceRecord);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return ResponseEntity.noContent().build();
    }
}