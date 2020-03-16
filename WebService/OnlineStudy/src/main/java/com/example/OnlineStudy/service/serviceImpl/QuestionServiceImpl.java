package com.example.OnlineStudy.service.serviceImpl;

import com.example.OnlineStudy.dto.response.AnswerDTO;
import com.example.OnlineStudy.dto.response.QuestionDTO;
import com.example.OnlineStudy.dto.response.QuestionDTOS;
import com.example.OnlineStudy.entity.*;
import com.example.OnlineStudy.mapper.MapperManager;
import com.example.OnlineStudy.repository.LessonRepository;
import com.example.OnlineStudy.repository.QuestionRepository;
import com.example.OnlineStudy.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private final QuestionRepository questionRepository;
    @Autowired
    private final LessonRepository lessonQuestionRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository, LessonRepository lessonQuestionRepository) {
        this.questionRepository = questionRepository;
        this.lessonQuestionRepository = lessonQuestionRepository;
    }

    @Override
    public QuestionDTOS getQuestion(int id) {
        Optional<Lesson> lesson = lessonQuestionRepository.findById(id);
        List<QuestionLesson> questionLessonList = lesson.get().getQuestionLessons();
        List<QuestionDTO> listQuestion = new ArrayList<>();
        for (QuestionLesson questionLesson: questionLessonList) {
            Question question = questionLesson.getQuestion();
            if(question != null){
                QuestionDTO dto = MapperManager.map(question,QuestionDTO.class);
                dto.setContent(question.getQuestion());
                dto.setImage_src(question.getImage());
                List<QuestionAnswer> questionAnswers = question.getQuestionAnswers();
                for (QuestionAnswer item: questionAnswers) {
                    AnswerDTO answerDTO = new AnswerDTO();
                    answerDTO.setId(item.getAnswer().getId());
                    answerDTO.setContent(item.getAnswer().getAnswer());
                    if(item.getIsCorrect()){
                        answerDTO.setAnswerMsg("Correct");
                    }else {
                        answerDTO.setAnswerMsg("Not correct");
                    }

                    if(item.getIsCorrect()){
                        dto.setCorrectId(answerDTO.getId());
                    }
                    dto.getAnswers().add(answerDTO);
                }
                listQuestion.add(dto);
            }
        }
        QuestionDTOS questionDTOS = new QuestionDTOS();
        questionDTOS.setQuestions(listQuestion);
      return questionDTOS;
    }
}
