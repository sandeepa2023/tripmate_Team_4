import React, { useRef, useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const sriLankaBounds = {
  north: 9.8,
  south: 5.9,
  west: 79.8,
  east: 81.9,
};

function Left({
  start, end,
  setStart, setEnd,
  directions, setDirections,
  attractions, setAttractions,
  routeFinderRef
}) {
  const [startLoc, setStartLoc] = useState(null);
  const [endLoc, setEndLoc] = useState(null);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  // Geocode a place name to lat/lng
  const geocodePlace = (place, callback) => {
    if (!window.google) {
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place }, (results, status) => {
      if (status === "OK" && results[0]) {
        callback(results[0].geometry.location);
      } else {
        setError(`Could not geocode: ${place}`);
        callback(null);
      }
    });
  };

  // Find route and attractions
  const handleFindRoute = () => {
    setError("");
    setDirections(null);
    setAttractions([]);
    if (!start || !end) {
      setError("Please enter both start and end locations.");
      return;
    }
    // Geocode both places
    geocodePlace(start, (startLocResult) => {
      if (!startLocResult) return;
      setStartLoc(startLocResult);
      
      geocodePlace(end, (endLocResult) => {
        if (!endLocResult) return;
        setEndLoc(endLocResult);
        
        // Get directions
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: startLocResult,
            destination: endLocResult,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);
              // Find attractions along the route
              findAttractions(result.routes[0].overview_path);
            } else {
              setError("Could not find route.");
            }
          }
        );
      });
    });
  };

  // Find attractions along the route using Places API
  const findAttractions = (path) => {
    if (!mapRef.current || !window.google) {
      return;
    }
    
    // Add a small delay to ensure map is fully ready
    setTimeout(() => {
      try {
        const placesService = new window.google.maps.places.PlacesService(mapRef.current);
        
        // Create search points every 20-30 path points to get better coverage
        const searchPoints = [];
        const stepSize = Math.max(1, Math.floor(path.length / 15)); // About 15 search points for better coverage
        
        for (let i = 0; i < path.length; i += stepSize) {
          searchPoints.push(path[i]);
        }
        
        // Also add the last point if not already included
        if (searchPoints[searchPoints.length - 1] !== path[path.length - 1]) {
          searchPoints.push(path[path.length - 1]);
        }
        
        let allAttractions = [];
        let completedSearches = 0;
        
        // Function to handle each search result
        const handleSearchResult = (results, status, pointIndex) => {
          completedSearches++;
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            // Filter out duplicates based on place_id and also filter by distance to route
            const newAttractions = results.filter(place => {
              // Check if this place is already in our list
              const isDuplicate = allAttractions.some(existing => existing.place_id === place.place_id);
              if (isDuplicate) return false;
              
              // Check if the place is reasonably close to the route path
              const placeLocation = place.geometry.location;
              const placeLat = typeof placeLocation.lat === 'function' ? placeLocation.lat() : placeLocation.lat;
              const placeLng = typeof placeLocation.lng === 'function' ? placeLocation.lng() : placeLocation.lng;
              
              // Check if place is within reasonable distance of any point on the route
              const isNearRoute = path.some(pathPoint => {
                const pathLat = typeof pathPoint.lat === 'function' ? pathPoint.lat() : pathPoint.lat;
                const pathLng = typeof pathPoint.lng === 'function' ? pathPoint.lng() : pathPoint.lng;
                
                // Calculate rough distance (not precise but good enough for filtering)
                const latDiff = Math.abs(placeLat - pathLat);
                const lngDiff = Math.abs(placeLng - pathLng);
                const roughDistance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                
                // If within roughly 0.08 degrees (~9km), consider it near the route
                return roughDistance < 0.08;
              });
              
              return isNearRoute;
            });
            
            // Add rating-based sorting - prioritize higher rated attractions
            const ratedAttractions = newAttractions.map(place => ({
              ...place,
              priority: (place.rating || 3) + (place.user_ratings_total || 0) / 1000 // Rating + review count factor
            }));
            
            allAttractions = [...allAttractions, ...ratedAttractions];
          }
          
          // If all searches are complete, update the state
          if (completedSearches === searchPoints.length) {
            // Sort by priority (rating + review count) and limit to 15
            const sortedAttractions = allAttractions
              .sort((a, b) => (b.priority || 0) - (a.priority || 0))
              .slice(0, 15); // Limit to maximum 15 attractions
            
            setAttractions(sortedAttractions);
          }
        };
        
        // Search at each point along the route
        searchPoints.forEach((point, index) => {
          const googleLatLng = new window.google.maps.LatLng(
            typeof point.lat === 'function' ? point.lat() : point.lat,
            typeof point.lng === 'function' ? point.lng() : point.lng
          );
          
          const request = {
            location: googleLatLng,
            radius: 20000, // 20km radius
            types: ['tourist_attraction'],
          };
          
          // Add a small delay between requests to avoid hitting rate limits
          setTimeout(() => {
            placesService.nearbySearch(request, (results, status) => {
              handleSearchResult(results, status, index);
            });
          }, index * 150); // 150ms delay between each request
        });
        
      } catch (serviceError) {
        console.error('Error creating PlacesService or calling nearbySearch:', serviceError);
      }
    }, 500); // 500ms delay
  };

  React.useEffect(() => {
    if (routeFinderRef) {
      routeFinderRef.current = handleFindRoute;
    }
  }, [start, end]);

    return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <div style={{ marginBottom: 8 }}>
        <label>
          Start location:{" "}
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="e.g. Kandy"
            style={{ marginRight: 8 }}
          />
        </label>
        <label>
          End location:{" "}
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="e.g. Colombo"
            style={{ marginRight: 8 }}
          />
        </label>
        <button onClick={handleFindRoute} style={{ padding: "4px 12px" }}>
          Find Route
        </button>
        {error && <div style={{ color: "red", marginTop: 4 }}>{error}</div>}
        
        {/* Display attraction names */}
        {attractions.length > 0 && (
          <div style={{ marginTop: 16, padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold" }}>
              Attractions Found ({attractions.length}):
            </h3>
            <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
              {attractions.map((place, idx) => (
                <div key={place.place_id || idx} style={{ marginBottom: "4px" }}>
                  <span style={{ fontWeight: "500" }}>{idx + 1}. {place.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onMapLoad}
        options={{ restriction: { latLngBounds: sriLankaBounds, strictBounds: false } }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {attractions.map((place, idx) => (
          <Marker
            key={place.place_id || idx}
            position={place.geometry.location}
            title={place.name}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Left;