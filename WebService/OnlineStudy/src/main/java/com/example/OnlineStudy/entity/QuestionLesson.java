package com.example.OnlineStudy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Question_Lesson")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionLesson {
    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "questionId", referencedColumnName = "id", nullable = false)
    private Question question;

    @ManyToOne
    @JoinColumn(name = "lessonId", referencedColumnName = "id", nullable = false)
    private Lesson lesson;

}
