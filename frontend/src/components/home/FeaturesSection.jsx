
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Map, Ticket, MessageSquareHeart } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "Personalized Itineraries",
    description: "AI-powered plans tailored to your interests, budget, and travel style for your Sri Lankan adventure.",
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: "Local Insights & Hidden Gems",
    description: "Discover authentic Sri Lankan experiences, from serene beaches to ancient temples, beyond the usual tourist spots.",
  },
  {
    icon: <Ticket className="h-10 w-10 text-primary" />,
    title: "Seamless Planning",
    description: "Organize your trip details, from destinations to activities, all in one intuitive platform. (Booking features coming soon!)",
  },
  {
    icon: <MessageSquareHeart className="h-10 w-10 text-primary" />,
    title: "24/7 AI Travel Companion",
    description: "Your AI travel buddy, always ready with tips, suggestions, and answers to your questions about Sri Lanka.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Why Choose TripMate for Sri Lanka?
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Unlock an unparalleled travel planning experience with our intelligent features.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
