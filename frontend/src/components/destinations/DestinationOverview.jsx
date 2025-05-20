import { FiStar, FiCalendar, FiClock, FiDollarSign } from 'react-icons/fi';

export default function DestinationOverview({ destination }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <p className="text-muted-foreground">{destination.description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <InfoCard
          icon={<FiStar className="text-primary" size={24} />}
          value={destination.rating}
          label={`${destination.reviews} reviews`}
        />
        <InfoCard
          icon={<FiCalendar className="text-primary" size={24} />}
          value="Best Time"
          label={destination.bestTimeToVisit}
        />
        <InfoCard
          icon={<FiClock className="text-primary" size={24} />}
          value="Duration"
          label="4-6 hours"
        />
        <InfoCard
          icon={<FiDollarSign className="text-primary" size={24} />}
          value="Price"
          label={`$${destination.price.from}-${destination.price.to}`}
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, value, label }) {
  return (
    <div className="text-center p-4 bg-muted rounded-lg">
      <div className="mx-auto mb-2">{icon}</div>
      <div className="font-semibold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}