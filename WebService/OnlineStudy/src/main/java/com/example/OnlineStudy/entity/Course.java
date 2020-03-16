package com.example.OnlineStudy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tblCourses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "name", nullable = true)
    private String name;
    @Column(name = "description", nullable = true)
    private String description;
    @Column(name = "icon", nullable = true)
    private String icon;
    @Column(name = "active", nullable = true)
    private boolean active;
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<CourseLesson> courseLesson;
}
