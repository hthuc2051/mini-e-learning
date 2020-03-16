package com.example.OnlineStudy.service;

import com.example.OnlineStudy.dto.request.LearningDTO;
import com.example.OnlineStudy.dto.response.CourseDTO;
import com.example.OnlineStudy.entity.Course;

import java.util.List;

public interface HomePageService {
    List<CourseDTO> getCourseAndLesson(int userId);
    String saveLearning(LearningDTO learningDTO);
}
