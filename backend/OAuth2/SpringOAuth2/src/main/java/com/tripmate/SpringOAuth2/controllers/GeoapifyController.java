package com.tripmate.SpringOAuth2.controllers;

import com.tripmate.SpringOAuth2.services.GeoapifyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/geo")
public class GeoapifyController {

    private final GeoapifyService geoapifyService;

    public GeoapifyController(GeoapifyService geoapifyService) {
        this.geoapifyService = geoapifyService;
    }

    @GetMapping("/geocode")
    public String geocode(@RequestParam String address) {
        return geoapifyService.geocode(address);
    }

    @GetMapping("/hotels")
    public String getNearbyHotels(@RequestParam double lat, @RequestParam double lon) {
        return geoapifyService.getNearbyHotels(lat, lon);
    }

    @GetMapping("/hotels/by-town")
    public String getHotelsByTown(@RequestParam String town) {
        return geoapifyService.getHotelsByTownName(town);
    }

}