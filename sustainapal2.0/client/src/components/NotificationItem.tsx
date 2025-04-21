import { format, parseISO } from "date-fns";
import { Bell, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ id, title, message, read, timestamp, onMarkAsRead }: NotificationItemProps) {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, h:mm a');
  };

  return (
    <div 
      className={cn(
        "flex items-start p-3 border-b last:border-b-0 transition-colors",
        read ? "opacity-70" : "bg-secondary/5"
      )}
    >
      <div className="flex-shrink-0 mr-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          read ? "bg-muted" : "bg-secondary/20"
        )}>
          <Bell className={cn(
            "h-4 w-4",
            read ? "text-muted-foreground" : "text-secondary"
          )} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={cn(
            "text-sm font-medium",
            !read && "font-semibold"
          )}>
            {title}
          </h4>
          <span className="text-xs text-muted-foreground ml-2">
            {formatDate(timestamp)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {message}
        </p>
      </div>
      {!read && (
        <button 
          onClick={() => onMarkAsRead(id)}
          className="ml-2 p-1 rounded-full hover:bg-muted flex-shrink-0"
          aria-label="Mark as read"
        >
          <Check className="h-4 w-4 text-primary" />
        </button>
      )}
    </div>
  );
}