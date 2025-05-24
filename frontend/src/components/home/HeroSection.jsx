import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  
  // Array of background images
  const images = [
    '/images/col2.jpg',
    '/images/col1.jpg',
    '/images/col3.jpg',
    '/images/col4.jpg',
    '/images/col5.jpg',
    '/images/col6.jpg',
    '/images/col7.jpg',
    '/images/col8.jpg',
    '/images/col9.jpg',
    // Add more images here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to change image
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full min-h-screen py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Image Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }} // Increased from 1 to 1.5 seconds
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${images[currentImageIndex]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center"> {/* Increased from max-w-3xl to max-w-4xl */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10" // Increased from space-y-8 to space-y-10
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/90"
            >
              Meet TripMate.
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-5xl lg:text-6xl text-white/90"
            >
              Your AI guide to Sri Lanka.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-[600px] mx-auto text-white/80 text-xl md:text-1xl lg:text-2xl xl:text-3xl leading-relaxed"
            >
              Plan your dream Sri Lankan getaway in minutes. Get personalized itineraries, discover hidden gems, and explore the island like never before.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center" // Increased gap from 4 to 6
            >
              <a href={isAuthenticated ? "/dashboard" : "/auth/signup"}>
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6" // Added text-lg and increased padding
                >
                  {isAuthenticated ? "Plan Your Trip" : "Start Planning for Free"}
                </Button>
              </a>
              
              <HashLink smooth to="/#how-it-works">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-lg px-8 py-6" // Added text-lg and increased padding
                >
                  Learn More
                </Button>
              </HashLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
