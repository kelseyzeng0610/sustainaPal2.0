import { Lightbulb, Thermometer, Zap, Droplet, Refrigerator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UsageCategoryCardProps {
  category: string;
  usage: number;
  cost: number;
  icon: string;
}

export function UsageCategoryCard({ category, usage, cost, icon }: UsageCategoryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'lightbulb':
        return <Lightbulb className="h-6 w-6 text-yellow-500" />;
      case 'thermometer':
        return <Thermometer className="h-6 w-6 text-red-500" />;
      case 'zap':
        return <Zap className="h-6 w-6 text-blue-500" />;
      case 'droplet':
        return <Droplet className="h-6 w-6 text-cyan-500" />;
      case 'refrigerator':
        return <Refrigerator className="h-6 w-6 text-gray-500" />;
      default:
        return <Zap className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Card className="ios-card ios-card-hover">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-primary/10 p-3">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{category}</h3>
            <div className="flex justify-between mt-1">
              <span className="text-sm text-muted-foreground">{usage} kWh</span>
              <span className="text-sm font-medium text-secondary">${cost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}