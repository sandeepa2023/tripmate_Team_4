package com.tripmate.SpringOAuth2.controllers;

import com.tripmate.SpringOAuth2.models.Trip;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips") 
public class TripController {

    private final List<Trip> trips = new ArrayList<>(); // for now i save the trips in this array. but will add to a db later

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        // Add validation logic here
        if (trip.getStartLocation() == null || trip.getEndLocation() == null || 
            trip.getStartDate() == null || trip.getEndDate() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        // In a real application, you'd save to a database
        trips.add(trip);
        System.out.println("Trip added successfully. Total trips: " + trips.size());
        return ResponseEntity.ok(trip);
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{index}")
    public ResponseEntity<Trip> getTripByIndex(@PathVariable int index) {
        if (index < 0 || index >= trips.size()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trips.get(index));
    }
    
    // Helper endpoint to check all saved trips (for debugging)
    @GetMapping("/debug")
    public ResponseEntity<Map<String, Object>> debugTrips() {
        Map<String, Object> response = new HashMap<>();
        response.put("count", trips.size());
        response.put("trips", trips);
        return ResponseEntity.ok(response);
    }
}