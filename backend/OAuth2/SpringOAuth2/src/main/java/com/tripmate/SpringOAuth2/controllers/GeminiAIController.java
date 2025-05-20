package com.tripmate.SpringOAuth2.controllers;

import com.tripmate.SpringOAuth2.models.Trip;
import com.tripmate.SpringOAuth2.services.GeminiAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/ai")
public class GeminiAIController {

    private final GeminiAIService geminiAIService;
    private final TripController tripController;

    @Autowired
    public GeminiAIController(GeminiAIService geminiAIService, TripController tripController) {
        this.geminiAIService = geminiAIService;
        this.tripController = tripController;
    }

    @GetMapping("/recommendations/{index}")
    public CompletableFuture<ResponseEntity<Map<String, String>>> getTripRecommendations(@PathVariable int index) {
        ResponseEntity<Trip> tripResponse = tripController.getTripByIndex(index);
        
        if (tripResponse.getStatusCode().is2xxSuccessful() && tripResponse.getBody() != null) {
            Trip trip = tripResponse.getBody();
            return geminiAIService.getTravelRecommendations(trip)
                    .thenApply(recommendations -> {
                        Map<String, String> response = new HashMap<>();
                        response.put("recommendations", recommendations);
                        return ResponseEntity.ok(response);
                    })
                    .exceptionally(ex -> {
                        Map<String, String> errorResponse = new HashMap<>();
                        errorResponse.put("error", "Failed to get recommendations: " + ex.getMessage());
                        return ResponseEntity.internalServerError().body(errorResponse);
                    });
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Trip not found with index: " + index);
            return CompletableFuture.completedFuture(ResponseEntity.notFound().build());
        }
    }

    @GetMapping("/itinerary/{index}")
    public CompletableFuture<ResponseEntity<Map<String, String>>> getTripItinerary(@PathVariable int index) {
        ResponseEntity<Trip> tripResponse = tripController.getTripByIndex(index);
        
        if (tripResponse.getStatusCode().is2xxSuccessful() && tripResponse.getBody() != null) {
            Trip trip = tripResponse.getBody();
            return geminiAIService.generateItinerary(trip)
                    .thenApply(itinerary -> {
                        Map<String, String> response = new HashMap<>();
                        response.put("itinerary", itinerary);
                        return ResponseEntity.ok(response);
                    })
                    .exceptionally(ex -> {
                        Map<String, String> errorResponse = new HashMap<>();
                        errorResponse.put("error", "Failed to generate itinerary: " + ex.getMessage());
                        return ResponseEntity.internalServerError().body(errorResponse);
                    });
        } else {
            return CompletableFuture.completedFuture(ResponseEntity.notFound().build());
        }
    }

    @GetMapping("/analyze")
    public CompletableFuture<ResponseEntity<Map<String, String>>> analyzeAllTrips() {
        ResponseEntity<List<Trip>> tripsResponse = tripController.getAllTrips();
        
        if (tripsResponse.getStatusCode().is2xxSuccessful() && tripsResponse.getBody() != null) {
            List<Trip> trips = tripsResponse.getBody();
            if (trips.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "No trips available for analysis");
                return CompletableFuture.completedFuture(ResponseEntity.ok(response));
            }
            
            return geminiAIService.analyzeTripData(trips)
                    .thenApply(analysis -> {
                        Map<String, String> response = new HashMap<>();
                        response.put("analysis", analysis);
                        return ResponseEntity.ok(response);
                    })
                    .exceptionally(ex -> {
                        Map<String, String> errorResponse = new HashMap<>();
                        errorResponse.put("error", "Failed to analyze trips: " + ex.getMessage());
                        return ResponseEntity.internalServerError().body(errorResponse);
                    });
        } else {
            return CompletableFuture.completedFuture(ResponseEntity.internalServerError().build());
        }
    }
}