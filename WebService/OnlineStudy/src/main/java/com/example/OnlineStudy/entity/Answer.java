package com.example.OnlineStudy.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Answer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "answer", nullable = true)
    private String answer;
    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL)
    private List<QuestionAnswer> questionAnswers;
}
