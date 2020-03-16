package com.example.OnlineStudy.repository;

import com.example.OnlineStudy.entity.Course;
import com.example.OnlineStudy.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

@Repository
public interface LessonRepository extends JpaRepository<Lesson,Integer> {
}
