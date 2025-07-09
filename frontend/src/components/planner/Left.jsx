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

function Left() {
  const [startName, setStartName] = useState("");
  const [endName, setEndName] = useState("");
  const [startLoc, setStartLoc] = useState(null);
  const [endLoc, setEndLoc] = useState(null);
  const [directions, setDirections] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  console.log('=== Left component render ===');
  console.log('Current attractions state:', attractions);
  console.log('Attractions length:', attractions.length);
  console.log('Directions state:', directions);
  console.log('Error state:', error);

  const onMapLoad = (map) => {
    console.log('=== Map loaded ===');
    console.log('Map instance:', map);
    mapRef.current = map;
    console.log('mapRef.current set to:', mapRef.current);
  };

  // Geocode a place name to lat/lng
  const geocodePlace = (place, callback) => {
    console.log('=== geocodePlace called ===');
    console.log('Place to geocode:', place);
    console.log('Google available:', !!window.google);
    
    if (!window.google) {
      console.log('Google not available, returning');
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place }, (results, status) => {
      console.log('Geocoding results for', place, ':', results);
      console.log('Geocoding status:', status);
      if (status === "OK" && results[0]) {
        console.log('Geocoding successful, location:', results[0].geometry.location);
        callback(results[0].geometry.location);
      } else {
        console.log('Geocoding failed for', place, 'with status:', status);
        setError(`Could not geocode: ${place}`);
        callback(null);
      }
    });
  };

  // Find route and attractions
  const handleFindRoute = () => {
    console.log('=== handleFindRoute called ===');
    console.log('Start name:', startName);
    console.log('End name:', endName);
    
    setError("");
    setDirections(null);
    setAttractions([]);
    if (!startName || !endName) {
      console.log('Missing start or end location');
      setError("Please enter both start and end locations.");
      return;
    }
    // Geocode both places
    console.log('Starting geocoding for start location:', startName);
    geocodePlace(startName, (startLocResult) => {
      console.log('Start location geocoded:', startLocResult);
      if (!startLocResult) return;
      setStartLoc(startLocResult);
      
      console.log('Starting geocoding for end location:', endName);
      geocodePlace(endName, (endLocResult) => {
        console.log('End location geocoded:', endLocResult);
        if (!endLocResult) return;
        setEndLoc(endLocResult);
        
        // Get directions
        console.log('Getting directions from', startLocResult, 'to', endLocResult);
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: startLocResult,
            destination: endLocResult,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            console.log('Directions result:', result);
            console.log('Directions status:', status);
            if (status === "OK") {
              setDirections(result);
              console.log('Route overview path:', result.routes[0].overview_path);
              console.log('Overview path length:', result.routes[0].overview_path.length);
              // Find attractions along the route
              findAttractions(result.routes[0].overview_path);
            } else {
              console.log('Directions failed with status:', status);
              setError("Could not find route.");
            }
          }
        );
      });
    });
  };

  // Find attractions along the route using Places API
  const findAttractions = (path) => {
    console.log('=== findAttractions called ===');
    console.log('Path received:', path);
    console.log('Path length:', path?.length);
    console.log('mapRef.current:', mapRef.current);
    console.log('window.google:', !!window.google);
    console.log('window.google.maps.places:', !!window.google?.maps?.places);
    
    if (!mapRef.current || !window.google) {
      console.log('Map or Google not ready');
      return;
    }
    
    // Add a small delay to ensure map is fully ready
    setTimeout(() => {
      console.log('Creating PlacesService after delay...');
      
      try {
        const placesService = new window.google.maps.places.PlacesService(mapRef.current);
        console.log('PlacesService created:', placesService);
        
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
        
        console.log(`Searching at ${searchPoints.length} points along the route (every ${stepSize} path points)`);
        
        let allAttractions = [];
        let completedSearches = 0;
        
        // Function to handle each search result
        const handleSearchResult = (results, status, pointIndex) => {
          completedSearches++;
          console.log(`Search ${completedSearches}/${searchPoints.length} completed for point ${pointIndex}`);
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            console.log(`Found ${results.length} attractions at point ${pointIndex}`);
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
            console.log(`Added ${newAttractions.length} new attractions. Total unique attractions so far: ${allAttractions.length}`);
          }
          
          // If all searches are complete, update the state
          if (completedSearches === searchPoints.length) {
            console.log('All searches completed. Processing final results...');
            
            // Sort by priority (rating + review count) and limit to 15
            const sortedAttractions = allAttractions
              .sort((a, b) => (b.priority || 0) - (a.priority || 0))
              .slice(0, 15); // Limit to maximum 15 attractions
            
            console.log(`Filtered from ${allAttractions.length} to ${sortedAttractions.length} top attractions`);
            console.log('Final attractions:', sortedAttractions.map(a => ({ 
              name: a.name, 
              rating: a.rating, 
              reviews: a.user_ratings_total 
            })));
            
            setAttractions(sortedAttractions);
          }
        };
        
        // Search at each point along the route
        searchPoints.forEach((point, index) => {
          console.log(`Starting search ${index + 1}/${searchPoints.length} at point:`, point);
          
          const googleLatLng = new window.google.maps.LatLng(
            typeof point.lat === 'function' ? point.lat() : point.lat,
            typeof point.lng === 'function' ? point.lng() : point.lng
          );
          
          const request = {
            location: googleLatLng,
            radius: 8000, // Smaller radius (8km) since we have more search points
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

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <div style={{ marginBottom: 8 }}>
        <label>
          Start location: {" "}
          <input
            type="text"
            value={startName}
            onChange={e => setStartName(e.target.value)}
            placeholder="e.g. Kandy"
            style={{ marginRight: 8 }}
          />
        </label>
        <label>
          End location: {" "}
          <input
            type="text"
            value={endName}
            onChange={e => setEndName(e.target.value)}
            placeholder="e.g. Colombo"
            style={{ marginRight: 8 }}
          />
        </label>
        <button onClick={handleFindRoute} style={{ padding: "4px 12px" }}>
          Find Route
        </button>
        {error && <div style={{ color: "red", marginTop: 4 }}>{error}</div>}
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onMapLoad}
        options={{ restriction: { latLngBounds: sriLankaBounds, strictBounds: false } }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {attractions.map((place, idx) => {
          console.log('Rendering marker for place:', place);
          console.log('Place geometry:', place.geometry);
          console.log('Place location:', place.geometry?.location);
          return (
            <Marker
              key={place.place_id || idx}
              position={place.geometry.location}
              title={place.name}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default Left;