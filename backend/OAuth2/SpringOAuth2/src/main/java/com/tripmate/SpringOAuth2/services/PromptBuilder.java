package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.models.TripRequest;

public class PromptBuilder {
    public static String buildEnhancedPrompt(TripRequest request) {
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
        prompt.append("Suggested Places (from route):\n");
        if (request.getCustomPlaces() != null && !request.getCustomPlaces().isEmpty()) {
            for (String place : request.getCustomPlaces()) {
                prompt.append("- ").append(place).append(" (tourist_attraction)\n");
            }
        } else {
            prompt.append("No specific attractions provided; suggest popular ones.\n");
        }
        prompt.append("\nRespond with:\n");
        prompt.append("1. DETAILED ITINERARY:\n[Day-by-day plan with activities, timings, and locations]\n\n");
        prompt.append("2. JSON STRUCTURE:\n```json\n[Structured data with days, activities, costs]\n```\n\n");
        prompt.append("3. BUDGET BREAKDOWN:\n[Detailed cost analysis]\n\n");
        prompt.append("4. RECOMMENDED PLACES:\n[List of must-visit locations]\n\n");
        prompt.append("5. TRAVEL TIPS:\n[Sri Lanka specific advice]");
        return prompt.toString();
    }
}