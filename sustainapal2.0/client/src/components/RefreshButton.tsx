import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  className?: string;
}

export function RefreshButton({ onRefresh, className }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={cn(
        "ios-button-primary rounded-full shadow-lg hover:shadow-primary/25",
        isRefreshing && "animate-pulse",
        className
      )}
    >
      <RefreshCw
        className={cn(
          "h-5 w-5 mr-2",
          isRefreshing && "animate-spin"
        )}
      />
      Refresh
    </Button>
  );
}