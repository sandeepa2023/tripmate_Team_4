package com.tripmate.SpringOAuth2.controllers;

import com.tripmate.SpringOAuth2.models.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class TripViewController {

    private final TripController tripController;

    @Autowired
    public TripViewController(TripController tripController) {
        this.tripController = tripController;
    }

    @GetMapping("/trips/view/{index}")
    public String viewTrip(@PathVariable int index, Model model) {
        ResponseEntity<Trip> response = tripController.getTripByIndex(index);
    
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            model.addAttribute("trip", response.getBody());
            model.addAttribute("index", index);
            return "view-trip";
        } else {
            return "redirect:/home";
        }
    }
}