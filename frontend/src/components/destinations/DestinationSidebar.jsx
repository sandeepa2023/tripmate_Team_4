import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function DestinationSidebar({ destination }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <WeatherSection weather={destination.weather} />
      <TransportationSection transportation={destination.transportation} />
      <CTASection name={destination.name} onPlan={() => navigate('/dashboard')} />
    </div>
  );
}

function WeatherSection({ weather }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Weather</h3>
      <div className="space-y-3">
        {Object.entries(weather).map(([season, description]) => (
          <div key={season} className="flex justify-between">
            <span className="capitalize text-muted-foreground">{season}</span>
            <span>{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransportationSection({ transportation }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Getting Around</h3>
      <ul className="space-y-2">
        {transportation.map((transport, index) => (
          <li key={index} className="text-muted-foreground">• {transport}</li>
        ))}
      </ul>
    </div>
  );
}

function CTASection({ name, onPlan }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm bg-primary/5">
      <h3 className="text-xl font-bold mb-2">Ready to explore {name}?</h3>
      <p className="text-muted-foreground mb-4">
        Start planning your trip now and create unforgettable memories.
      </p>
      <Button 
        variant="default" 
        className="w-full"
        onClick={onPlan}
      >
        Start Planning
      </Button>
    </div>
  );
}