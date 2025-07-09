package com.tripmate.SpringOAuth2.services;

import com.tripmate.SpringOAuth2.models.TripRequest;
import com.tripmate.SpringOAuth2.models.TripResponse;
import org.springframework.stereotype.Service;

@Service
public class TripPlannerService {

    public TripResponse planTrip(TripRequest request) {
        // Temporary mock response
        TripResponse response = new TripResponse();
        response.setItineraryText("Sample trip plan coming soon...");
        response.setEstimatedBudget(request.getBudget());
        return response;
    }
}
