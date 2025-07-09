package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.models.PlaceSuggestion;
import com.tripmate.SpringOAuth2.models.TripRequest;

import java.util.List;

public class PromptBuilder {

    public static String buildPrompt(TripRequest request, List<PlaceSuggestion> places) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are a personalized Sri Lankan travel assistant.\n");
        prompt.append("Create a day-by-day plan ONLY for destinations in Sri Lanka.\n\n");

        prompt.append("User Request:\n");
        prompt.append("Start Location: ").append(request.getStart()).append("\n");
        prompt.append("End Location: ").append(request.getEnd()).append("\n");
        prompt.append("Number of People: ").append(request.getPeople()).append("\n");
        prompt.append("Days Planning: ").append(request.getDays()).append("\n");
        prompt.append("Expected Budget (LKR): ").append(request.getBudget()).append("\n");
        prompt.append("Notes/Preferences: ").append(request.getNotes()).append("\n\n");

        prompt.append("Suggested Places (fetched from Google Maps):\n");
        for (PlaceSuggestion place : places) {
            prompt.append("- ").append(place.getName())
                    .append(" (").append(place.getType()).append(") ")
                    .append("at ").append(place.getLocation()).append(". ")
                    .append(place.getDescription()).append("\n");
        }

        prompt.append("\nRespond with:\n");
        prompt.append("1. A detailed day-wise itinerary\n");
        prompt.append("2. JSON object with daily plan\n");
        prompt.append("3. Final estimated budget\n");
        prompt.append("4. Extra suggested places along the route\n");

        if (request.getCustomPlaces() != null && !request.getCustomPlaces().isEmpty()) {
            prompt.append("\nUser has explicitly requested to include the following places:\n");
            for (String place : request.getCustomPlaces()) {
                prompt.append("- ").append(place).append("\n");
            }
        }

        return prompt.toString();
    }
}
