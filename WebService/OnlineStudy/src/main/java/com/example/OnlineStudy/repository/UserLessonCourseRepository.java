package com.example.OnlineStudy.repository;

import com.example.OnlineStudy.entity.UserLessonCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserLessonCourseRepository extends JpaRepository<UserLessonCourse,Integer> {
    @Query(value ="SELECT id,user_id, lesson_course_id,status FROM User_Lesson_Course WHERE user_id = ?1 and lesson_course_id = ?2",nativeQuery = true)
    UserLessonCourse getUserLessonCourse(Integer userId, Integer lessonCourseId);

    @Modifying
    @Query(value = "INSERT INTO User_Lesson_Course (user_id,lesson_course_id,status) values (?1,?2,?3)",nativeQuery = true)
    @Transactional
    void InsertUserLessonCourse(Integer userId, Integer lessonCourseId,String status);
}
