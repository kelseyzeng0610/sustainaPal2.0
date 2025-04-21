import { Award, Leaf, Zap, Droplet, Tree, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface BadgeCardProps {
  name: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

export function BadgeCard({ name, icon, unlocked, progress = 0 }: BadgeCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'award':
        return <Award className="h-8 w-8" />;
      case 'leaf':
        return <Leaf className="h-8 w-8" />;
      case 'zap':
        return <Zap className="h-8 w-8" />;
      case 'droplet':
        return <Droplet className="h-8 w-8" />;
      case 'tree':
        return <Tree className="h-8 w-8" />;
      case 'sparkles':
        return <Sparkles className="h-8 w-8" />;
      default:
        return <Award className="h-8 w-8" />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mb-2",
          unlocked 
            ? "bg-primary/20 text-primary" 
            : "bg-muted text-muted-foreground"
        )}
      >
        {getIcon()}
      </div>
      <span className="text-sm font-medium text-center">{name}</span>
      {!unlocked && progress > 0 && (
        <div className="w-full mt-2">
          <Progress value={progress} className="h-1" />
        </div>
      )}
    </div>
  );
}