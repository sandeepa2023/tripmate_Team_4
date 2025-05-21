package com.tripmate.SpringOAuth2.controllers;

import com.tripmate.SpringOAuth2.models.Trip;
import com.tripmate.SpringOAuth2.services.GeminiAIService;
import com.tripmate.SpringOAuth2.services.GoogleMapsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Arrays;
import java.util.List;

@Controller
public class MapController {
    
    @Value("${google.maps.api.key}")
    private String googleMapsApiKey;
    
    private final TripController tripController;
    private final GeminiAIService geminiAIService;
    private final GoogleMapsService googleMapsService;
    
    @Autowired
    public MapController(
            TripController tripController,
            GeminiAIService geminiAIService,
            GoogleMapsService googleMapsService) {
        this.tripController = tripController;
        this.geminiAIService = geminiAIService;
        this.googleMapsService = googleMapsService;
    }

    @GetMapping("/showmap")
    public String showMap(Model model) {
        model.addAttribute("apiKey", googleMapsApiKey);
        return "map";
    }
    
    @GetMapping("/trip-map/{index}")
    public String showTripMap(@PathVariable int index, Model model) {
        Trip trip = tripController.getTripByIndex(index).getBody();
        
        if (trip == null) {
            return "redirect:/home";
        }
        
        model.addAttribute("apiKey", googleMapsApiKey);
        model.addAttribute("trip", trip);
        
        // Get AI suggested attractions to mark on the map
        geminiAIService.analyzeTripData(List.of(trip))
            .thenAccept(attractions -> {
                // The response is formatted as locations separated by $
                List<String> attractionList = Arrays.asList(attractions.split("\\$"));
                model.addAttribute("attractions", attractionList);
            })
            .join(); // Wait for the result
            
        return "map";
    }
}