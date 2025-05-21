package com.tripmate.SpringOAuth2.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;
import java.util.Map;
import java.util.HashMap;

@Controller
public class HelloController {

    @GetMapping("/")
    public String root() {
        return "redirect:/home";
    }

    @GetMapping("/trips")
    public String trips() {
        return "trips";
    }
}