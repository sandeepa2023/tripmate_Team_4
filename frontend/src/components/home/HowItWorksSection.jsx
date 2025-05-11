
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, MapPinned, Edit3, Send } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Planning Your Sri Lankan Adventure is Easy
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Just a few simple steps to your personalized itinerary.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl text-foreground">
                What kind of trip are you dreaming of?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="e.g., A 7-day family trip to Kandy and Ella with beaches"
                  className="flex-grow text-base"
                  aria-label="Describe your dream trip"
                />
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Send className="h-5 w-5 mr-2" />
                  Get Plan
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Tell TripMate your interests, duration, and companions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-foreground">1. Share Your Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tell us about your ideal Sri Lankan journey – your interests, budget, and travel style. The more details, the better!
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <MapPinned className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-foreground">2. Get a Custom Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI crafts a personalized itinerary filled with stunning sights, cultural experiences, and hidden gems of Sri Lanka.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Edit3 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-foreground">3. Customize & Go!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fine-tune your plan, add or remove activities, and get ready for an unforgettable adventure in Sri Lanka.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
