package com.example.OnlineStudy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTOS {
    List<QuestionDTO> questions;
    int latestIndex = 2;
 }
