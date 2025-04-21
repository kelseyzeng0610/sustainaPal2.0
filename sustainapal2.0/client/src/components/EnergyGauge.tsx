import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface EnergyGaugeProps {
  currentUsage: number;
  dailyGoal: number;
}

export function EnergyGauge({ currentUsage, dailyGoal }: EnergyGaugeProps) {
  const [progress, setProgress] = useState(0);
  const percentage = Math.min(Math.round((currentUsage / dailyGoal) * 100), 100);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Wrapper for energy usage vs daily goal part */}
      <div className="w-full mb-4 flex flex-col items-center">
        <div className="w-full mb-2 flex justify-between items-center">
          <span className="text-sm font-medium">0 kWh</span>
          <span className="text-sm font-medium">{dailyGoal} kWh</span>
        </div>

        <div className="w-full">
          <Progress 
            value={progress} 
            className="h-4 bg-muted" 
          />
        </div>
        
        {/* Circle wrapper for current usage */}
        <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
          <div 
            className={cn(
              "flex items-center justify-center shadow-md transition-all",
              progress > 80 ? "bg-destructive" : "bg-primary"
            )}
            style={{ left: `calc(${progress}% - 2rem)` }}
          >
           
          </div>
        </div>
      </div>

      {/* Message below progress bar */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {percentage < 80 
            ? `You're doing great! ${Math.round(dailyGoal - currentUsage)} kWh below your daily goal.` 
            : `You're close to your daily limit!`}
        </p>
      </div>
    </div>
  );
}
