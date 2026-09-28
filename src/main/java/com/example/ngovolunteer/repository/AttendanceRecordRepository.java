package com.example.ngovolunteer.repository;

import com.example.ngovolunteer.entity.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
}