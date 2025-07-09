package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.models.PlaceSuggestion;
import com.tripmate.SpringOAuth2.models.TripRequest;
import com.tripmate.SpringOAuth2.models.TripResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TripPlannerService {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private LLMService llmService;

    public TripResponse planTrip(TripRequest request) {
        List<PlaceSuggestion> places = placeService.getSuggestions(request);

        // Step 1: Build prompt
        String prompt = PromptBuilder.buildPrompt(request, places);

        // Step 2: Call Gemini/Gemma
        String modelOutput = llmService.getTripPlan(prompt);

        // Step 3: Calculate budget
        Map<String, Double> budget = BudgetCalculator.calculate(request.getPeople(), request.getDays());

        // Step 4: Build response
        TripResponse response = new TripResponse();
        response.setSuggestedPlaces(places);
        response.setItineraryText(modelOutput);
        response.setEstimatedBudget(budget.get("Total"));
        response.setBudgetBreakdown(budget);

        if (request.getCustomPlaces() != null) {
            for (String custom : request.getCustomPlaces()) {
                PlaceSuggestion extra = new PlaceSuggestion();
                extra.setName(custom);
                extra.setType("user-added");
                extra.setLocation("Unknown");
                extra.setDescription("User-defined custom place");
                places.add(extra);
            }
        }

        return response;
    }
}
