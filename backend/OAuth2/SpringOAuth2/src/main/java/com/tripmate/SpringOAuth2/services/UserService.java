package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.repositories.UserRepo;
import com.tripmate.SpringOAuth2.models.Users;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public Users register(Users user){
        return repo.save(user);
    }
    
}
