import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [stops, setStops] = useState(['']);
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startingLocation, setStartingLocation] = useState('');
  const [finalDestination, setFinalDestination] = useState('');

  const addStop = () => {
    setStops([...stops, '']);
  };

  const removeStop = (index) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const updateStop = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handleSaveTrip = () => {
    const tripData = {
      startingLocation,
      stops: stops.filter(stop => stop.trim() !== ''),
      finalDestination,
      travelers,
      budget,
      startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
      endDate: endDate ? endDate.format('YYYY-MM-DD') : null
    };

    console.log('Saving trip data:', tripData);
    // Here you would typically make an API call to save the trip
    
    // Reset form
    setStartingLocation('');
    setStops(['']);
    setFinalDestination('');
    setTravelers(1);
    setBudget(0);
    setStartDate(null);
    setEndDate(null);
    
    // Navigate to dashboard or show success message
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a New Trip</h1>
        
        <div className="space-y-6">
          {/* Starting Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Location
            </label>
            <input
              type="text"
              placeholder="Enter your starting point"
              value={startingLocation}
              onChange={(e) => setStartingLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Stops Along the Way */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stops Along the Way
            </label>
            {stops.map((stop, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Enter stop ${index + 1} (optional)`}
                  value={stop}
                  onChange={(e) => updateStop(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {index > 0 && (
                  <button
                    onClick={() => removeStop(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addStop}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <PlusOutlined /> Add Another Stop
            </button>
          </div>

          {/* Final Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Destination
            </label>
            <input
              type="text"
              placeholder="Enter your destination"
              value={finalDestination}
              onChange={(e) => setFinalDestination(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travelers
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <MinusOutlined />
              </button>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 p-2 border border-gray-300 rounded-md text-center"
                min="1"
              />
              <button
                onClick={() => setTravelers(travelers + 1)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <PlusOutlined />
              </button>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget for Trip ($)
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setBudget(Math.max(0, budget - 100))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <MinusOutlined />
              </button>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-32 p-2 border border-gray-300 rounded-md text-center"
                min="0"
                step="100"
              />
              <button
                onClick={() => setBudget(budget + 100)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <PlusOutlined />
              </button>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              className="w-full"
              placeholder="Select start date"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              className="w-full"
              placeholder="Select end date"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSaveTrip}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              Create Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip; 