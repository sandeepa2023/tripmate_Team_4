import { Lightbulb, MapPinned, Edit3 } from "lucide-react";

// Map the string icon types to the actual components
const iconComponents = {
  Lightbulb: Lightbulb,
  MapPinned: MapPinned,
  Edit3: Edit3
};

// Simple function to get the icon component from the type
export const getIconByType = (iconType) => {
  return iconComponents[iconType] || null;
};

export const processSteps = [
  {
    iconType: "Lightbulb",
    title: "Share Your Vision",
    description: "Tell us about your ideal Sri Lankan journey – your interests, budget, and travel style."
  },
  {
    iconType: "MapPinned",
    title: "Get a Custom Plan",
    description: "Our AI crafts a personalized itinerary filled with stunning sights and experiences."
  },
  {
    iconType: "Edit3",
    title: "Customize & Go!",
    description: "Fine-tune your plan, add or remove activities, and get ready for your adventure."
  }
];