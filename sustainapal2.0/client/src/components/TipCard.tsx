import { Lightbulb, Plug, Thermometer, Sun, LightbulbOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TipCardProps {
  title: string;
  savings: number;
  icon: string;
}

export function TipCard({ title, savings, icon }: TipCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'lightbulb':
        return <Lightbulb className="h-6 w-6 text-primary" />;
      case 'plug':
        return <Plug className="h-6 w-6 text-primary" />;
      case 'thermometer':
        return <Thermometer className="h-6 w-6 text-primary" />;
      case 'sun':
        return <Sun className="h-6 w-6 text-primary" />;
      case 'bulb':
        return <LightbulbOff className="h-6 w-6 text-primary" />;
      default:
        return <Lightbulb className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Card className="ios-card ios-card-hover">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-secondary font-semibold mt-1">Save ${savings}/month</p>
          </div>
        </div>
        <Button className="w-full mt-4 ios-button-primary">
          Try It Now
        </Button>
      </CardContent>
    </Card>
  );
}