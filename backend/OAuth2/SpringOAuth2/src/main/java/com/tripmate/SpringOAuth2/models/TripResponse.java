package com.tripmate.SpringOAuth2.models;

import java.util.List;

public class TripResponse {
    private String itineraryText;
    private List<PlannedDay> days;
    private double estimatedBudget;
    private List<PlaceSuggestion> suggestedPlaces;

    // Getters and Setters
    public String getItineraryText() { return itineraryText; }
    public void setItineraryText(String itineraryText) { this.itineraryText = itineraryText; }

    public List<PlannedDay> getDays() { return days; }
    public void setDays(List<PlannedDay> days) { this.days = days; }

    public double getEstimatedBudget() { return estimatedBudget; }
    public void setEstimatedBudget(double estimatedBudget) { this.estimatedBudget = estimatedBudget; }

    public List<PlaceSuggestion> getSuggestedPlaces() { return suggestedPlaces; }
    public void setSuggestedPlaces(List<PlaceSuggestion> suggestedPlaces) { this.suggestedPlaces = suggestedPlaces; }
}