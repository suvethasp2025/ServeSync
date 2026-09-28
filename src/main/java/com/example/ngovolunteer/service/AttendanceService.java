package com.example.ngovolunteer.service;

import com.example.ngovolunteer.entity.AttendanceRecord;
import com.example.ngovolunteer.repository.AttendanceRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    private final AttendanceRecordRepository attendanceRecordRepository;

    public AttendanceService(AttendanceRecordRepository attendanceRecordRepository) {
        this.attendanceRecordRepository = attendanceRecordRepository;
    }

    public List<AttendanceRecord> getAllAttendance() {
        return attendanceRecordRepository.findAll();
    }

    public Optional<AttendanceRecord> getAttendanceById(Long id) {
        return attendanceRecordRepository.findById(id);
    }

    public AttendanceRecord createAttendance(AttendanceRecord attendanceRecord) {
        return attendanceRecordRepository.save(attendanceRecord);
    }

    public AttendanceRecord updateAttendance(Long id, AttendanceRecord attendanceDetails) {

        AttendanceRecord attendance = attendanceRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found"));

        attendance.setEventId(attendanceDetails.getEventId());
        attendance.setVolunteerId(attendanceDetails.getVolunteerId());
        attendance.setAttendanceStatus(attendanceDetails.getAttendanceStatus());

        return attendanceRecordRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRecordRepository.deleteById(id);
    }
}