
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    role: "Solo Traveler",
    avatar: "https://picsum.photos/seed/priya/100/100",
    aiHint: "woman portrait",
    text: "TripMate made planning my Sri Lanka trip so easy! The personalized itinerary was perfect and I discovered places I wouldn't have found on my own.",
    rating: 5,
  },
  {
    name: "Rohan K.",
    role: "Family Vacationer",
    avatar: "https://picsum.photos/seed/rohan/100/100",
    aiHint: "man portrait",
    text: "Our family had an amazing time in Sri Lanka, all thanks to TripMate. It took the stress out of planning and catered to everyone's interests.",
    rating: 5,
  },
  {
    name: "Anjali M.",
    role: "Adventure Seeker",
    avatar: "https://picsum.photos/seed/anjali/100/100",
    aiHint: "person smiling",
    text: "Loved how TripMate helped me find off-the-beaten-path adventures in Sri Lanka. The AI suggestions were spot on!",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Loved by Travelers to Sri Lanka
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Hear what others are saying about their TripMate experience.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
