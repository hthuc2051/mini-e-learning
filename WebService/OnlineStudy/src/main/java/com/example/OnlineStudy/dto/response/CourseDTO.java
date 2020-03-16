package com.example.OnlineStudy.dto.response;

import com.example.OnlineStudy.entity.CourseLesson;
import com.example.OnlineStudy.entity.Lesson;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {

    private Integer id;

    private String name;

    private String description;

    private String icon;

    private String status;

    private List<LessonDTO> courseLesson;
}
