
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Changed from next/link

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            Meet TripMate.
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl text-foreground/90">
            Your AI guide to Sri Lanka.
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto md:mx-0">
            Plan your dream Sri Lankan getaway in minutes. Get personalized itineraries, discover hidden gems, and explore the island like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/auth/signup"> {/* Changed from href, passHref removed */}
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto shadow-lg transform hover:scale-105 transition-transform duration-200">
                Start Planning for Free
              </Button>
            </Link>
            <Link to="/#how-it-works"> {/* Changed from href, passHref removed, ensure this ID exists on the page */}
              <Button size="lg" variant="outline" className="w-full sm:w-auto shadow-md hover:bg-primary/10 transition-colors duration-200">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden shadow-2xl group">
            <img // Changed from next/image
              src="https://picsum.photos/seed/srilanka-hero/800/600"
              alt="Beautiful Sri Lankan Landscape"
              className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover w-full h-full" // Added object-cover, w-full, h-full
              data-ai-hint="Sri Lanka landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
