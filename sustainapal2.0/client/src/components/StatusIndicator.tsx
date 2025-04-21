import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ActivitySquare, AlertCircle, CheckCircle2, Database } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface StatusIndicatorProps {
  className?: string;
}

enum ServerStatus {
  CHECKING = "checking",
  ONLINE = "online",
  OFFLINE = "offline",
}

interface SystemStatus {
  server: ServerStatus;
  mongodb: boolean;
}

export function StatusIndicator({ className }: StatusIndicatorProps) {
  const [status, setStatus] = useState<SystemStatus>({
    server: ServerStatus.CHECKING,
    mongodb: false
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [startResult, setStartResult] = useState<null | { success: boolean; message: string }>(null);

  const checkServerStatus = async () => {
    try {
      // Simple ping request to check if server is reachable
      const pingResponse = await fetch("/api/ping", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (pingResponse.ok) {
        // If server is online, check MongoDB status
        try {
          const statusResponse = await fetch("/api/status", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            setStatus({
              server: ServerStatus.ONLINE,
              mongodb: statusData.mongodb.connected
            });
          } else {
            setStatus({
              server: ServerStatus.ONLINE,
              mongodb: false
            });
          }
        } catch (error) {
          setStatus({
            server: ServerStatus.ONLINE,
            mongodb: false
          });
        }
      } else {
        setStatus({
          server: ServerStatus.OFFLINE,
          mongodb: false
        });
      }
    } catch (error) {
      console.error("Error checking server status:", error);
      setStatus({
        server: ServerStatus.OFFLINE,
        mongodb: false
      });
    }
  };

  useEffect(() => {
    // Check immediately and then every 30 seconds
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const startMongoDB = async () => {
    setIsStarting(true);
    setStartResult(null);

    try {
      const response = await fetch("/api/mongodb/start", {
        method: "POST"
      });

      if (response.ok) {
        const data = await response.json();
        setStartResult(data);
        if (data.success) {
          // Re-check status after successful start
          setTimeout(checkServerStatus, 2000);
        }
      } else {
        setStartResult({
          success: false,
          message: "Failed to start MongoDB. Please try manually."
        });
      }
    } catch (error) {
      setStartResult({
        success: false,
        message: "Connection error. Please try again."
      });
    } finally {
      setIsStarting(false);
    }
  };

  const getStatusDetails = () => {
    if (status.server === ServerStatus.ONLINE) {
      if (status.mongodb) {
        return {
          label: "All Systems Online",
          description: "Server and database are connected",
          icon: <CheckCircle2 className="h-3 w-3 text-primary" />,
          variant: "outline" as const,
        };
      } else {
        return {
          label: "Using Mock Data",
          description: "Server is online but database is disconnected",
          icon: <Database className="h-3 w-3 text-orange-500" />,
          variant: "outline" as const,
        };
      }
    } else if (status.server === ServerStatus.OFFLINE) {
      return {
        label: "Server Offline",
        description: "Cannot connect to server",
        icon: <AlertCircle className="h-3 w-3 text-destructive" />,
        variant: "outline" as const,
      };
    } else {
      return {
        label: "Checking",
        description: "Checking system status",
        icon: <ActivitySquare className="h-3 w-3 animate-pulse text-blue-500" />,
        variant: "outline" as const,
      };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Badge
                variant={statusDetails.variant}
                className={className}
                onClick={() => status.server === ServerStatus.ONLINE && !status.mongodb && setDialogOpen(true)}
              >
                {statusDetails.icon}
                <span className="ml-1">{statusDetails.label}</span>
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{statusDetails.description}</p>
            {status.server === ServerStatus.ONLINE && !status.mongodb && (
              <p className="text-xs text-muted-foreground mt-1">Click to start MongoDB</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Database Connection</DialogTitle>
            <DialogDescription>
              Your app is using mock data because MongoDB is not connected.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {!startResult ? (
              <p className="text-sm text-muted-foreground">
                You can start MongoDB to use real data instead of mock data.
              </p>
            ) : startResult.success ? (
              <div className="flex items-center text-primary gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <p>{startResult.message}</p>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-destructive">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <p>{startResult.message}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can try to start MongoDB manually or continue using mock data.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {!startResult?.success && (
              <Button onClick={startMongoDB} disabled={isStarting}>
                {isStarting ? "Starting..." : "Start MongoDB"}
              </Button>
            )}
            {startResult?.success && (
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}