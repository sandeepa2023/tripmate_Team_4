package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.models.PlaceSuggestion;
import com.tripmate.SpringOAuth2.models.TripRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@Service
public class PlaceService {

    @Value("${google.places.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

    private final RestTemplate restTemplate = new RestTemplate();

    public List<PlaceSuggestion> getSuggestions(TripRequest request) {
        List<PlaceSuggestion> allPlaces = new ArrayList<>();

        // Search nearby from start and end
        allPlaces.addAll(searchPlaces(request.getStart(), "tourist attractions"));
        allPlaces.addAll(searchPlaces(request.getEnd(), "places to visit"));
        allPlaces.addAll(searchPlaces(request.getEnd(), "hotels"));
        allPlaces.addAll(searchPlaces(request.getEnd(), "restaurants"));

        return allPlaces;
    }

    private List<PlaceSuggestion> searchPlaces(String location, String query) {
        List<PlaceSuggestion> results = new ArrayList<>();

        String uri = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("query", query + " in " + location + ", Sri Lanka")
                .queryParam("key", apiKey)
                .toUriString();

        Map<String, Object> response = restTemplate.getForObject(uri, Map.class);
        if (response != null && response.containsKey("results")) {
            List<Map<String, Object>> places = (List<Map<String, Object>>) response.get("results");
            for (Map<String, Object> place : places) {
                PlaceSuggestion suggestion = new PlaceSuggestion();
                suggestion.setName((String) place.get("name"));
                suggestion.setLocation((String) ((Map<String, Object>) place.get("geometry")).get("location").toString());
                suggestion.setDescription((String) place.get("formatted_address"));
                suggestion.setType(query);
                results.add(suggestion);
            }
        }
        return results;
    }
}

