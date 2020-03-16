package com.example.OnlineStudy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO implements Serializable {
    private int id;
    private String content;
    private String image_src;
    private int correctId;
    List<AnswerDTO> answers = new ArrayList<>();
}
