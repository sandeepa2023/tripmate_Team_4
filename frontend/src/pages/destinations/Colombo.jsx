import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import DestinationHero from '@/components/destinations/DestinationHero';
import DestinationOverview from '@/components/destinations/DestinationOverview';
import DestinationGallery from '@/components/destinations/DestinationGallery';
import DestinationSidebar from '@/components/destinations/DestinationSidebar';

export default function ColomboPage() {
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  const destination = {
    name: 'Colombo',
    country: 'Sri Lanka',
    rating: 4.9,
    reviews: 2100,
    price: {
      from: 50,
      to: 600,
    },
    description: 'Colombo is allure lies in its historical charm meeting modern dynamism, a vibrant tapestry of sights and sounds.',
    image: '/destinations/Colombo/cover.jpg',
    gallery: [
      '/destinations/Colombo/floating.jpg',
      '/destinations/Colombo/lltus.jpg',
      '/destinations/Colombo/temple.jpg'
    ],
    highlights: [
      'Walk through silver city',
      'VTasting varieties of foods',
      'Explore the water gardens',
      'Visit the modern beauty',
      'Watch around sri lanka'
    ],
    bestTimeToVisit: 'Throughout the year',
    weather: {
      spring: 'Warm and humid',
      summer: 'Hot and dry',
      autumn: 'Pleasant and normal',
      winter: 'Cool and dry'
    },
    transportation: [
      'Tuk-tuk',
      'Private car/pick-me',
      'Tour bus',
      'Local bus'
    ]
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-background">
      <DestinationHero 
        destination={destination}
        isLiked={isLiked}
        onToggleLike={toggleLike}
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <DestinationOverview destination={destination} />
              <DestinationGallery 
                images={destination.gallery}
                name={destination.name}
              />
            </div>
            <DestinationSidebar destination={destination} />
          </div>
        </div>
      </section>
    </div>
  );
}