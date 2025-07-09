import React, { useState, useRef } from 'react';
import Left from '../components/planner/Left';
import Right from '../components/planner/Right';

function Planner() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [directions, setDirections] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const routeFinderRef = useRef(null); // used to trigger replan from Right

  const handleRoutePlan = async () => {
    if (routeFinderRef.current) {
      routeFinderRef.current(); // trigger route + attraction search in Left
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className="flex items-center justify-center bg-blue-100">
        <Left
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          directions={directions}
          setDirections={setDirections}
          attractions={attractions}
          setAttractions={setAttractions}
          routeFinderRef={routeFinderRef}
        />
      </div>
      <div className="flex items-center justify-center bg-green-100">
        <Right
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          onReplan={handleRoutePlan}
        />
      </div>
    </div>
  );
}

export default Planner;
