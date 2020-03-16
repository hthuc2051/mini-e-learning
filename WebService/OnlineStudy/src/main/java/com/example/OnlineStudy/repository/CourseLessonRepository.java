package com.example.OnlineStudy.repository;

import com.example.OnlineStudy.entity.CourseLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseLessonRepository extends JpaRepository<CourseLesson,Integer> {
    @Query(value ="SELECT id,course_id,lesson_id FROM tblCourses_Lessons WHERE course_id = ?1 and lesson_id = ?2",nativeQuery = true)
    CourseLesson getIdByLessonAndCourseId(Integer courseId, Integer lessonId);
}
