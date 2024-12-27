package com.example.HelpingUnity.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.HelpingUnity.entity.User;
import com.example.HelpingUnity.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String username, String Email,String password) {
        User user = new User();
        user.setFullName(username);
        user.setEmail(Email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER"); 
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}