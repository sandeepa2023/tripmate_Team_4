import TripPlannerCard from "./TripPlannerCard";
import ProcessStep from "./ProcessStep";
import { processSteps } from "@/data/processSteps";

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
          <TripPlannerCard />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              iconType={step.iconType}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
