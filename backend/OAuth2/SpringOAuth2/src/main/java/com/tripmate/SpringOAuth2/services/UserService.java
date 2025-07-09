package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.repositories.UserRepo;
import com.tripmate.SpringOAuth2.models.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users register(Users user){
        // Check if username already exists
        if (repo.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // Check if email already exists (for OAuth2 integration)
        if (user.getEmail() != null && repo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Validate input
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }
        
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters long");
        }
        
        // Set provider as "local" for regular registration
        if (user.getProvider() == null) {
            user.setProvider("local");
        }
        
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public String verify(Users user){
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        if (authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        } else {
            return "Login failed";
        }
    }
    
    public Users getUserByUsername(String username) {
        Users user = repo.findByUsername(username);
        if (user == null) {
            user = repo.findByEmail(username);
        }
        return user;
    }
}
