package com.example.OnlineStudy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tblUsers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "username", nullable = true)
    private String username;
    @Column(name = "password", nullable = true)
    private String password;
    @Column(name = "role", nullable = true)
    private String role;
    @Column(name = "active", nullable = true)
    private Boolean active;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserLessonCourse> userLessonCourseList;
}
