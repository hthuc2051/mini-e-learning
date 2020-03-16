package com.example.OnlineStudy.repository;

import com.example.OnlineStudy.common.Constant;
import com.example.OnlineStudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "SELECT id,username,password,role,active FROM tblUsers WHERE username = ?1 and password = ?2",nativeQuery = true)
    User login(String username, String password);

    @Query(value = "SELECT id FROM tblUsers WHERE username = ?1 ",nativeQuery = true)
    String isUsernameExisted(String username);

    @Modifying
    @Query(value = "INSERT INTO tblUsers (username,password,role,active) values (?1,?2,?3,?4)",nativeQuery = true)
    @Transactional
    void register(String username, String password,String role, boolean active);
}
