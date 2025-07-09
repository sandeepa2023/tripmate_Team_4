package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.repositories.UserRepo;
import com.tripmate.SpringOAuth2.models.Users;
import com.tripmate.SpringOAuth2.utils.ProfileValidator;

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
    
    public Users updateProfile(String username, String name, String email, String profilePictureUrl) {
        Users user = getUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        // Validate input
        if (name != null && !ProfileValidator.isValidName(name)) {
            throw new RuntimeException("Name must be between 1 and 100 characters");
        }
        
        if (email != null && !ProfileValidator.isValidEmail(email)) {
            throw new RuntimeException("Invalid email format");
        }
        
        if (profilePictureUrl != null && !ProfileValidator.isValidProfilePictureUrl(profilePictureUrl)) {
            throw new RuntimeException("Invalid profile picture URL");
        }
        
        // Check if email is being changed and if it's already taken by another user
        if (email != null && !email.equals(user.getEmail())) {
            Users existingUserWithEmail = repo.findByEmail(email);
            if (existingUserWithEmail != null && existingUserWithEmail.getId() != user.getId()) {
                throw new RuntimeException("Email is already taken by another user");
            }
            user.setEmail(email);
        }
        
        if (name != null && !name.trim().isEmpty()) {
            user.setName(name);
        }
        
        if (profilePictureUrl != null) {
            user.setProfilePictureUrl(profilePictureUrl);
        }
        
        return repo.save(user);
    }
    
    public void changePassword(String username, String currentPassword, String newPassword) {
        Users user = getUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        // OAuth2 users cannot change password
        if (user.getPassword() == null || "google".equals(user.getProvider()) || "github".equals(user.getProvider())) {
            throw new RuntimeException("Cannot change password for OAuth2 users");
        }
        
        // Verify current password
        if (!encoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        // Validate new password
        if (newPassword == null || newPassword.length() < 6) {
            throw new RuntimeException("New password must be at least 6 characters long");
        }
        
        user.setPassword(encoder.encode(newPassword));
        repo.save(user);
    }
    
    public void deleteAccount(String username, String password) {
        Users user = getUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        // For local users, verify password
        if ("local".equals(user.getProvider()) && user.getPassword() != null) {
            if (!encoder.matches(password, user.getPassword())) {
                throw new RuntimeException("Password is incorrect");
            }
        }
        
        repo.delete(user);
    }
}
