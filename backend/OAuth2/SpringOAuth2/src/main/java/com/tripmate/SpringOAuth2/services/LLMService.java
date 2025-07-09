package com.tripmate.SpringOAuth2.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class LLMService {

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    private static final String API_KEY = "AIzaSyDBzJBoLEs9CWcyFdFCm9EPl1uX8jdaBk0"; // Move to env later

    public String getTripPlan(String prompt) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("contents", List.of(
                Map.of("parts", List.of(Map.of("text", prompt)))
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        String url = GEMINI_ENDPOINT + "?key=" + API_KEY;

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    url, HttpMethod.POST, entity, Map.class
            );

            Map content = (Map) ((List) response.getBody().get("candidates")).get(0);
            Map output = (Map) ((List) content.get("content")).get(0);
            return (String) output.get("text");

        } catch (Exception e) {
            return "Error calling LLM: " + e.getMessage();
        }
    }
}