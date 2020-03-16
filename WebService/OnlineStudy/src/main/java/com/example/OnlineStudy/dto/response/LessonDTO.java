package com.example.OnlineStudy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonDTO {
    private Integer id;
    private String name;
    private String description;
    private String status;
}
