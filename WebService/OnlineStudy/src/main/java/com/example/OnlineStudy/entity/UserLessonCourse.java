package com.example.OnlineStudy.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "User_Lesson_Course")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLessonCourse {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "lesson_course_id", referencedColumnName = "id", nullable = false)
    private CourseLesson lessonCourse;

    @Column(name = "status")
    private String status;
}
