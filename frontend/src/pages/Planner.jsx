import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, DollarSign, Route, Sparkles, Clock, Navigation } from 'lucide-react';

const Planner = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [directions, setDirections] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);

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

  const onMapLoad = (map) => {
    googleMapRef.current = map;
    setIsMapLoaded(true);
  };

  const geocodePlace = (place, callback) => {
    if (!window.google) {
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place }, (results, status) => {
      if (status === "OK" && results[0]) {
        callback(results[0].geometry.location);
      } else {
        setError(`Could not find location: ${place}`);
        callback(null);
      }
    });
  };

  const findAttractions = (path) => {
    if (!googleMapRef.current || !window.google) {
      return;
    }
    
    setTimeout(() => {
      try {
        const placesService = new window.google.maps.places.PlacesService(googleMapRef.current);
        
        const searchPoints = [];
        const stepSize = Math.max(1, Math.floor(path.length / 15));
        
        for (let i = 0; i < path.length; i += stepSize) {
          searchPoints.push(path[i]);
        }
        
        if (searchPoints[searchPoints.length - 1] !== path[path.length - 1]) {
          searchPoints.push(path[path.length - 1]);
        }
        
        let allAttractions = [];
        let completedSearches = 0;
        
        const handleSearchResult = (results, status) => {
          completedSearches++;
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const newAttractions = results.filter(place => {
              const isDuplicate = allAttractions.some(existing => existing.place_id === place.place_id);
              if (isDuplicate) return false;
              
              const placeLocation = place.geometry.location;
              const placeLat = typeof placeLocation.lat === 'function' ? placeLocation.lat() : placeLocation.lat;
              const placeLng = typeof placeLocation.lng === 'function' ? placeLocation.lng() : placeLocation.lng;
              
              const isNearRoute = path.some(pathPoint => {
                const pathLat = typeof pathPoint.lat === 'function' ? pathPoint.lat() : pathPoint.lat;
                const pathLng = typeof pathPoint.lng === 'function' ? pathPoint.lng() : pathPoint.lng;
                
                const latDiff = Math.abs(placeLat - pathLat);
                const lngDiff = Math.abs(placeLng - pathLng);
                const roughDistance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                
                return roughDistance < 0.08;
              });
              
              return isNearRoute;
            });
            
            const ratedAttractions = newAttractions.map(place => ({
              ...place,
              priority: (place.rating || 3) + (place.user_ratings_total || 0) / 1000
            }));
            
            allAttractions = [...allAttractions, ...ratedAttractions];
          }
          
          if (completedSearches === searchPoints.length) {
            const sortedAttractions = allAttractions
              .sort((a, b) => (b.priority || 0) - (a.priority || 0))
              .slice(0, 20);
            
            setAttractions(sortedAttractions);
          }
        };
        
        searchPoints.forEach((point, index) => {
          const googleLatLng = new window.google.maps.LatLng(
            typeof point.lat === 'function' ? point.lat() : point.lat,
            typeof point.lng === 'function' ? point.lng() : point.lng
          );
          
          const request = {
            location: googleLatLng,
            radius: 20000,
            types: ['tourist_attraction'],
          };
          
          setTimeout(() => {
            placesService.nearbySearch(request, (results, status) => {
              handleSearchResult(results, status);
            });
          }, index * 150);
        });
        
      } catch (serviceError) {
        console.error('Error finding attractions:', serviceError);
        setError('Error finding attractions along the route');
      }
    }, 500);
  };

  const handleFindRoute = () => {
    if (!start || !end) {
      setError('Please enter both start and end locations');
      return;
    }

    if (!window.google) {
      setError('Google Maps is not loaded yet. Please try again.');
      return;
    }

    setError('');
    setDirections(null);
    setAttractions([]);
    setActiveStep(2);
    
    geocodePlace(start, (startLocation) => {
      if (!startLocation) return;
      
      geocodePlace(end, (endLocation) => {
        if (!endLocation) return;
        
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: startLocation,
            destination: endLocation,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              setDirections(result);
              findAttractions(result.routes[0].overview_path);
            } else {
              setError("Could not find route between the locations");
            }
          }
        );
      });
    });
  };

  const createOptimizedRoute = () => {
    if (!suggestedPlaces.length || !googleMapRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();
    
    // Convert suggested places to waypoints
    const waypoints = suggestedPlaces.slice(0, 8).map(place => ({
      location: place.name,
      stopover: true
    }));

    directionsService.route(
      {
        origin: start,
        destination: end,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  };

  const handleGeneratePlan = async () => {
    if (!start || !end || !days || !people || !budget) {
      setError('Please fill all required fields');
      return;
    }

    if (attractions.length === 0) {
      setError('Please find route and attractions first');
      return;
    }

    setIsLoading(true);
    setError('');
    setActiveStep(3);

    const requestData = {
      start,
      end,
      days: parseInt(days),
      people: parseInt(people),
      budget: parseInt(budget),
      notes: preferences,
      customPlaces: attractions.slice(0, 10).map(place => place.name)
    };

    try {
      const response = await fetch('http://localhost:8080/api/trip/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate trip plan');
      }

      const results = await response.json();
      setItinerary(results.itineraryText);
      setSuggestedPlaces(results.suggestedPlaces || []);
      
      // Create optimized route with suggested places
      setTimeout(() => {
        createOptimizedRoute();
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate trip plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Google Maps script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        // Initialize map after script loads
        if (mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: 7,
            restriction: { latLngBounds: sriLankaBounds, strictBounds: false },
            styles: [
              {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#1d2c4d"}]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#8ec3b9"}]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#1a3646"}]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#4b6878"}]
              },
              {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#2c5a85"}]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"color": "#34495e"}]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#0e1626"}]
              }
            ]
          });
          onMapLoad(map);
        }
      };
      document.head.appendChild(script);
    } else {
      // Google Maps is already loaded
      if (mapRef.current && !googleMapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: center,
          zoom: 7,
          restriction: { latLngBounds: sriLankaBounds, strictBounds: false },
        });
        onMapLoad(map);
      }
    }
  }, []);

  // Update map when directions change
  useEffect(() => {
    if (directions && googleMapRef.current && window.google) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#f97316",
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });
      directionsRenderer.setMap(googleMapRef.current);
      directionsRenderer.setDirections(directions);
    }
  }, [directions]);

  // Update markers when attractions change
  useEffect(() => {
    if (attractions.length > 0 && googleMapRef.current && window.google) {
      // Clear existing markers (you might want to keep track of them)
      attractions.forEach((place) => {
        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: googleMapRef.current,
          title: place.name,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
          }
        });
      });
    }
  }, [attractions]);

  const stepProgress = activeStep === 1 ? 33 : activeStep === 2 ? 66 : 100;

  // Format itinerary text with proper styling
  const formatItinerary = (text) => {
    if (!text) return null;
    
    const sections = text.split('\n').map((line, index) => {
      // Headers (lines starting with **)
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={index} className="text-lg font-bold text-orange-300 mt-4 mb-2 flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      }
      
      // Day headers
      if (line.startsWith('*') && line.includes('Day')) {
        return (
          <h4 key={index} className="text-md font-semibold text-blue-300 mt-3 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {line.replace(/\*/g, '')}
          </h4>
        );
      }
      
      // Bullet points
      if (line.trim().startsWith('*')) {
        return (
          <div key={index} className="ml-4 mb-1 flex items-start">
            <span className="text-orange-400 mr-2 mt-1">•</span>
            <span className="text-gray-200">{line.replace(/^\s*\*\s*/, '')}</span>
          </div>
        );
      }
      
      // Time stamps
      if (line.match(/^\d{1,2}:\d{2}\s*(AM|PM)/)) {
        return (
          <div key={index} className="ml-6 mb-1 flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5 text-green-400" />
            <span className="text-gray-200">{line}</span>
          </div>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="mb-2"></div>;
      }
      
      // Regular text
      return (
        <p key={index} className="text-gray-200 mb-2 leading-relaxed">
          {line}
        </p>
      );
    });
    
    return sections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Progress Bar */}
      <div className="bg-gray-800 px-6 py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Planning Progress</span>
            <span className="text-sm font-medium text-orange-400">{stepProgress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stepProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
              <h2 className="text-xl font-bold text-orange-400 mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                Plan Your Adventure
              </h2>

              {error && (
                <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-4">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      From
                    </label>
                    <input
                      type="text"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      placeholder="e.g., Kandy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Navigation className="h-4 w-4 inline mr-1" />
                      To
                    </label>
                    <input
                      type="text"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      placeholder="e.g., Colombo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Days
                    </label>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      min="1"
                      max="30"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      placeholder="7"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Users className="h-4 w-4 inline mr-1" />
                      Travelers
                    </label>
                    <input
                      type="number"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      min="1"
                      max="20"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <DollarSign className="h-4 w-4 inline mr-1" />
                      Budget (LKR)
                    </label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      min="1000"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Sparkles className="h-4 w-4 inline mr-1" />
                    Preferences & Interests
                  </label>
                  <textarea
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                    placeholder="Tell us about your interests, food preferences, accommodation type, activities you enjoy..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleFindRoute}
                    disabled={!start || !end || !isMapLoaded}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed"
                  >
                    <Route className="h-5 w-5 mr-2" />
                    Find Route
                  </button>
                  <button
                    onClick={handleGeneratePlan}
                    disabled={isLoading || !start || !end || !days || !people || !budget || attractions.length === 0}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Planning...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Plan
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Attractions Found */}
              {attractions.length > 0 && (
                <div className="mt-6 bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Attractions Found ({attractions.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {attractions.slice(0, 8).map((place, idx) => (
                      <div key={place.place_id || idx} className="text-xs text-blue-200 bg-blue-800/50 rounded px-2 py-1">
                        {place.name} {place.rating && `⭐ ${place.rating}`}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Insights */}
            {itinerary && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
                <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2" />
                  AI Travel Insights
                </h3>
                <div className="bg-gray-700/50 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <div className="text-sm leading-relaxed">
                    {formatItinerary(itinerary)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Map */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
              <Navigation className="h-6 w-6 mr-2" />
              Your Journey Map
            </h3>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <div 
                ref={mapRef}
                style={containerStyle}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;