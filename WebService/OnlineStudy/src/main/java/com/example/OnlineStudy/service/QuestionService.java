package com.example.OnlineStudy.service;

import com.example.OnlineStudy.dto.response.QuestionDTO;
import com.example.OnlineStudy.dto.response.QuestionDTOS;

import java.util.List;

public interface QuestionService {
    QuestionDTOS getQuestion(int id);
}
