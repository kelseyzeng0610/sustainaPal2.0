import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface LeaderboardItemProps {
  name: string;
  avatar: string;
  savings: number;
  position: number;
  isCurrentUser: boolean;
}

export function LeaderboardItem({ 
  name, 
  avatar, 
  savings, 
  position, 
  isCurrentUser 
}: LeaderboardItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg transition-all",
      isCurrentUser ? "bg-secondary/10" : "hover:bg-muted"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full font-medium text-sm",
          position === 1 ? "bg-yellow-400 text-black" :
          position === 2 ? "bg-gray-300 text-black" :
          position === 3 ? "bg-amber-600 text-white" :
          "bg-muted text-muted-foreground"
        )}>
          {position}
        </div>
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <span className={cn(
          "font-medium",
          isCurrentUser && "text-secondary"
        )}>
          {name}
        </span>
      </div>
      <div className="flex items-center">
        <span className={cn(
          "font-bold",
          isCurrentUser ? "text-secondary" : "text-primary"
        )}>
          ${savings.toFixed(2)}
        </span>
        <span className="text-sm text-muted-foreground ml-1">saved</span>
      </div>
    </div>
  );
}