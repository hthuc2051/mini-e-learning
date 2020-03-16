package com.example.OnlineStudy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tblCourses_Lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseLesson {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "lesson_id", referencedColumnName = "id", nullable = false)
    private Lesson lesson;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<UserLessonCourse> userLessonCourseList;
}
