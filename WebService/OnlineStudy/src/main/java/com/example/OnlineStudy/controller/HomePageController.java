package com.example.OnlineStudy.controller;

import com.example.OnlineStudy.dto.request.LearningDTO;
import com.example.OnlineStudy.dto.request.UserDTO;
import com.example.OnlineStudy.dto.response.CourseDTO;
import com.example.OnlineStudy.dto.response.QuestionDTO;
import com.example.OnlineStudy.dto.response.UserResponseDTO;
import com.example.OnlineStudy.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:9999")
@RestController
@RequestMapping("/api")
public class HomePageController {
    @Autowired
    private HomePageService homePageService;

    public HomePageController(HomePageService homePageService) {
        this.homePageService = homePageService;
    }

    @GetMapping("/loadDashboard/{id}")
    public ResponseEntity<List<CourseDTO>> loadDashboard(@PathVariable Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(homePageService.getCourseAndLesson(id));
    }

    @PostMapping("/saveLearning")
    public ResponseEntity<String> saveLearning(@RequestBody LearningDTO learningDTO){
        return ResponseEntity.status(HttpStatus.OK).body(homePageService.saveLearning(learningDTO));
    }
}
