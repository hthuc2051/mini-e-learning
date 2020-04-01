package com.example.OnlineStudy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tblLessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "name", nullable = true)
    private String name;
    @Column(name = "description", nullable = true)
    private String description;
    @Column(name = "video_link", nullable = true)
    private String video_link;
    @Column(name = "active", nullable = true)
    private boolean active;
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<CourseLesson> courseLesson;
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<QuestionLesson> questionLessons;
}
