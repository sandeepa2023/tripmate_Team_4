package com.tripmate.SpringOAuth2.models;

import java.time.LocalDate;
import java.util.List;

public class Trip {
    private String startLocation;
    private List<String> stops;
    private String endLocation;
    private int numberOfTravelers;
    private LocalDate startDate;
    private LocalDate endDate;

    public Trip() {
    }

    public Trip(String startLocation, List<String> stops, String endLocation, int numberOfTravelers, 
               LocalDate startDate, LocalDate endDate) {
        this.startLocation = startLocation;
        this.stops = stops;
        this.endLocation = endLocation;
        this.numberOfTravelers = numberOfTravelers;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public List<String> getStops() {
        return stops;
    }

    public void setStops(List<String> stops) {
        this.stops = stops;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public int getNumberOfTravelers() {
        return numberOfTravelers;
    }

    public void setNumberOfTravelers(int numberOfTravelers) {
        this.numberOfTravelers = numberOfTravelers;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}