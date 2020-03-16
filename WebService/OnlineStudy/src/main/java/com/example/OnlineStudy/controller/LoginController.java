package com.example.OnlineStudy.controller;

import com.example.OnlineStudy.dto.request.UserDTO;
import com.example.OnlineStudy.dto.response.UserResponseDTO;
import com.example.OnlineStudy.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:9999")
@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserDTO userDTO){
        return ResponseEntity.status(HttpStatus.OK).body(loginService.login(userDTO));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserDTO userDTO){
        return ResponseEntity.status(HttpStatus.OK).body(loginService.register(userDTO));
    }
}
