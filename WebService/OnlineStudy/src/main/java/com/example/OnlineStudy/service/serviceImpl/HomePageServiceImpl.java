package com.example.OnlineStudy.service.serviceImpl;

import com.example.OnlineStudy.common.Constant;
import com.example.OnlineStudy.dto.request.LearningDTO;
import com.example.OnlineStudy.dto.response.CourseDTO;
import com.example.OnlineStudy.dto.response.LessonDTO;
import com.example.OnlineStudy.entity.*;
import com.example.OnlineStudy.mapper.MapperManager;
import com.example.OnlineStudy.repository.*;
import com.example.OnlineStudy.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HomePageServiceImpl implements HomePageService {
    @Autowired
    private final CourseRepository courseRepository;
    @Autowired
    private final LessonRepository lessonRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final CourseLessonRepository courseLessonRepository;
    @Autowired
    private final UserLessonCourseRepository userLessonCourseRepository;

    public HomePageServiceImpl(CourseRepository courseRepository, LessonRepository lessonRepository, UserRepository userRepository, CourseLessonRepository courseLessonRepository, UserLessonCourseRepository userLessonCourseRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.userRepository = userRepository;
        this.courseLessonRepository = courseLessonRepository;
        this.userLessonCourseRepository = userLessonCourseRepository;
    }

    @Override
    public List<CourseDTO> getCourseAndLesson(int userId) {
        List<Course> course= courseRepository.findAll();
        List<CourseDTO> listCourse = new ArrayList<>();
        for (Course item: course) {
            if(item.isActive() == true){
                List<CourseLesson> courseLessonList = item.getCourseLesson();
                List<LessonDTO> listLesson = new ArrayList<>();
                for (CourseLesson courseLesson: courseLessonList) {
                    Lesson lesson = courseLesson.getLesson();
                    if(lesson.isActive() == true) {
                        listLesson.add(MapperManager.map(lesson, LessonDTO.class));
                    }
                }
                CourseDTO courseDTO =  MapperManager.map(item, CourseDTO.class);
                courseDTO.setCourseLesson(listLesson);
                listCourse.add(courseDTO);
            }else {
              // not add to course
            }
        }
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
           List<UserLessonCourse> userLessonCourse =  user.get().getUserLessonCourseList();
            for (UserLessonCourse item: userLessonCourse) {
             CourseLesson courseLesson =   item.getLessonCourse();
             String status = item.getStatus();
             Course courses = courseLesson.getCourse();
             Lesson lesson = courseLesson.getLesson();
                for (CourseDTO courseTemp: listCourse) {
                    if(courseTemp.getId() == courses.getId()){
                        courseTemp.setStatus(status);
                        for (LessonDTO lessonDTO: courseTemp.getCourseLesson()) {
                            if(lesson.getId() == lessonDTO.getId()){
                                lessonDTO.setStatus(status);
                            }

                        }
                    }
                }
            }
        }

        return listCourse;
    }

    @Override
    public String saveLearning(LearningDTO learningDTO) {
        CourseLesson courseLesson = courseLessonRepository.getIdByLessonAndCourseId(learningDTO.getCourseId(),learningDTO.getLessonId());
        UserLessonCourse userLessonCourse = userLessonCourseRepository.getUserLessonCourse(learningDTO.getUserId(),courseLesson.getId());
        if(userLessonCourse != null){
            if(learningDTO.getStatus().equals(Constant.LEARNED) && userLessonCourse.getStatus().equals(Constant.LEARNING)){
                userLessonCourse.setStatus(Constant.LEARNED);
                userLessonCourseRepository.save(userLessonCourse);
            }
        }else {
                userLessonCourseRepository.InsertUserLessonCourse(learningDTO.getUserId(),courseLesson.getId(),learningDTO.getStatus());
        }
        return "success";
    }
}
