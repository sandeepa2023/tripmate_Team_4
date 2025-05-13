package com.tripmate.SpringOAuth2.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

    @GetMapping("/showmap")
    public String index() {
        return "index";
    }

}