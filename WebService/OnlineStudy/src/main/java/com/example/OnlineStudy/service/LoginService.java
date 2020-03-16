package com.example.OnlineStudy.service;

import com.example.OnlineStudy.dto.request.UserDTO;
import com.example.OnlineStudy.dto.response.UserResponseDTO;

public interface LoginService {
    UserResponseDTO login(UserDTO dto);
    UserResponseDTO register(UserDTO dto);
}
