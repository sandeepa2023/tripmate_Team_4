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

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  // Geocode a place name to lat/lng
  const geocodePlace = (place, callback) => {
    if (!window.google) return;
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
    if (!startName || !endName) {
      setError("Please enter both start and end locations.");
      return;
    }
    // Geocode both places
    geocodePlace(startName, (startLocResult) => {
      if (!startLocResult) return;
      setStartLoc(startLocResult);
      geocodePlace(endName, (endLocResult) => {
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
    console.log('findAttractions called', path, mapRef.current, window.google);
    if (!mapRef.current || !window.google) {
      console.log('Map or Google not ready');
      return;
    }
    const placesService = new window.google.maps.places.PlacesService(mapRef.current);
    // Search near the midpoint of the route
    const midpoint = path[Math.floor(path.length / 2)];
    const request = {
      location: midpoint,
      radius: 20000, // 20km radius
      type: ["tourist_attraction"],
    };
    placesService.nearbySearch(request, (results, status) => {
      console.log('Attractions results:', results, status);
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setAttractions(results);
      }
    });
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