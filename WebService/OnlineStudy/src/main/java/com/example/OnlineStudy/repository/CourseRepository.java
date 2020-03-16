package com.example.OnlineStudy.repository;

import com.example.OnlineStudy.entity.Course;
import com.example.OnlineStudy.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course,Integer> {
}
