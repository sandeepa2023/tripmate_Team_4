import { Lightbulb, MapPinned, Edit3 } from "lucide-react";

const iconComponents = {
  Lightbulb: Lightbulb,
  MapPinned: MapPinned,
  Edit3: Edit3,
};

export default function ProcessStep({ iconType, title, description }) {
  const IconComponent = iconComponents[iconType];
  
  return (
    <div className="text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
        <IconComponent className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
