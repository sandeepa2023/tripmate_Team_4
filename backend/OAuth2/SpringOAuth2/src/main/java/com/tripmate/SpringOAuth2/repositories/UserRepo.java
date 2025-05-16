package com.tripmate.SpringOAuth2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tripmate.SpringOAuth2.models.Users;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository <Users, Integer>{
    
    Users findByUsername(String username);
}
