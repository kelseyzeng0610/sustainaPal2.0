import { useState, useEffect } from "react";
import { AlertCircle, X, Database } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function MongoDBStatusAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    // Check if this alert has been dismissed before
    const alertDismissed = localStorage.getItem("mongoAlertDismissed");

    // Only check status if not previously dismissed
    if (!alertDismissed) {
      const checkStatus = async () => {
        try {
          const response = await fetch("/api/status");
          if (response.ok) {
            const data = await response.json();
            setDbStatus(data.mongodb.connected ? 'connected' : 'disconnected');
            setIsVisible(!data.mongodb.connected);
          } else {
            setDbStatus('disconnected');
            setIsVisible(true);
          }
        } catch (error) {
          console.error("Error checking MongoDB status:", error);
          setDbStatus('disconnected');
          setIsVisible(true);
        }
      };

      // Set a delay to ensure the app has fully initialized
      const timer = setTimeout(() => {
        checkStatus();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const dismissAlert = () => {
    // Mark alert as dismissed so we don't show it again
    localStorage.setItem("mongoAlertDismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible || dbStatus === 'connected' || dbStatus === 'checking') return null;

  return (
    <Alert variant="default" className="mb-4 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
      <div className="flex items-start">
        <Database className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
        <div className="flex-1">
          <AlertTitle className="text-amber-800 dark:text-amber-300 text-base">
            Running with Mock Data
          </AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            <p>The application is currently using mock data because MongoDB is not connected. This is normal for local development.</p>
            <p className="mt-2 text-sm">To connect to a real database, please check your MongoDB connection settings in the .env file.</p>
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={dismissAlert}
          className="h-6 w-6 text-amber-700 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
}