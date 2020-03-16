package com.example.OnlineStudy.service.serviceImpl;

import com.example.OnlineStudy.common.Constant;
import com.example.OnlineStudy.dto.request.UserDTO;
import com.example.OnlineStudy.dto.response.UserResponseDTO;
import com.example.OnlineStudy.entity.User;
import com.example.OnlineStudy.mapper.MapperManager;
import com.example.OnlineStudy.repository.QuestionRepository;
import com.example.OnlineStudy.repository.UserRepository;
import com.example.OnlineStudy.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private final UserRepository userRepository;

    public LoginServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDTO login(UserDTO userDTO) {
        User user = userRepository.login(userDTO.getUsername(), userDTO.getPassword());
        UserResponseDTO dto;
        if (user == null) {
            dto = new UserResponseDTO();
            dto.setRole("failed");
        }else{
           dto = MapperManager.map(user, UserResponseDTO.class);
        }
        return dto;
    }

    @Override
    public UserResponseDTO register(UserDTO dto) {
        String message = "";
        String id = userRepository.isUsernameExisted(dto.getUsername());
        UserResponseDTO responseDTO = null;
        if(id == null) {
            userRepository.register(dto.getUsername(), dto.getPassword(), "user", true);
            message = Constant.REGISTER_SUCCESS_MESSAGE;
            responseDTO = login(dto);
        } else {
            message = Constant.REGISTER_USERNAME_EXISTED;
            responseDTO = new UserResponseDTO();
        }
        responseDTO.setMessage(message);
        return responseDTO;
    }
}
