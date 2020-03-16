package com.example.OnlineStudy.controller;

import com.example.OnlineStudy.dto.request.UserDTO;
import com.example.OnlineStudy.dto.response.QuestionDTO;
import com.example.OnlineStudy.dto.response.QuestionDTOS;
import com.example.OnlineStudy.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:9999")
@RestController
@RequestMapping("/api")
public class QuestionController {
    @Autowired
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<QuestionDTOS> getQuestion(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(questionService.getQuestion(id));
    }

//    @PostMapping("/question")
//    public ResponseEntity<List<QuestionDTO>> addQuestion(QuestionDTO dto){
//        return ResponseEntity.status(HttpStatus.OK).body(questionService.getAllQuestion());
//    }

}
