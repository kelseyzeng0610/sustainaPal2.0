import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";

interface DailyChallengeProps {
  title: string;
  progress: number;
  reward: number;
}

export function DailyChallenge({ title, progress, reward }: DailyChallengeProps) {
  return (
    <Card className="ios-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Daily Challenge</CardTitle>
          <div className="flex items-center">
            <Award className="h-4 w-4 text-primary mr-1" />
            <span className="text-sm font-medium text-primary">${reward.toFixed(2)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium mb-4">{title}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
        <Button className="w-full mt-4 ios-button-primary">
          Complete Challenge
        </Button>
      </CardContent>
    </Card>
  );
}