import { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import DestinationHero from '@/components/destinations/DestinationHero';
import DestinationOverview from '@/components/destinations/DestinationOverview';
import DestinationGallery from '@/components/destinations/DestinationGallery';
import DestinationSidebar from '@/components/destinations/DestinationSidebar';

export default function EllaPage() {
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();

  const destination = {
    name: 'Ella',
    country: 'Sri Lanka',
    rating: 4.5,
    reviews: 2150,
    price: {
      from: 30,
      to: 100,
    },
    description: 'Ella is a small town in the central highlands of Sri Lanka, known for its stunning views, tea plantations, and hiking trails. It is a popular destination for travelers seeking natural beauty and adventure.',
    image: '/destinations/Ella/cover.jpg',
    gallery: [
      '/destinations/Ella/climbE.webp',
      '/destinations/Ella/ellaNight.jpg',
      '/destinations/Ella/nildiyaE.jpg'
    ],
    highlights: [
      'Climb the ancient rock fortress',
      'View the beautiful frescoes',
      'Explore the water gardens',
      'Visit the lion gate',
      'Watch the sunset from the top'
    ],
    bestTimeToVisit: 'December to March',
    weather: {
      spring: 'Warm and humid',
      summer: 'Hot and rainy',
      autumn: 'Pleasant and dry',
      winter: 'Cool and dry'
    },
    transportation: [
      'Tuk-tuk',
      'Private car',
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