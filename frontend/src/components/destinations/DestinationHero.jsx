import { FiMapPin, FiHeart } from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function DestinationHero({ destination, isLiked, onToggleLike }) {
  const navigate = useNavigate();

  return (
    <section className="relative h-96">
      <img 
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
              <p className="flex items-center text-lg">
                <FiMapPin className="mr-2" />
                {destination.country}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="border-2 border-white hover:bg-white/10 text-white hover:text-white"
                onClick={onToggleLike}
              >
                <FiHeart className={`mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Saved' : 'Save'}
              </Button>
              <Button 
                variant="default"
                onClick={() => navigate('/dashboard')}
              >
                Plan Your Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}