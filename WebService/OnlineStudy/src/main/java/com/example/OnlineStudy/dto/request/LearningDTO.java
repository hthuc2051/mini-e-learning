package com.example.OnlineStudy.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningDTO {
    private int userId;
    private int courseId;
    private int lessonId;
    private String status;
}
