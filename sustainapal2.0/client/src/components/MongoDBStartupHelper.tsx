import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, AlertCircle, CheckCircle, Server } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function MongoDBStartupHelper() {
  const [isStarting, setIsStarting] = useState(false);
  const [startStatus, setStartStatus] = useState<'idle' | 'starting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const startMongoDB = async () => {
    setIsStarting(true);
    setStartStatus('starting');

    try {
      const response = await fetch("/api/mongodb/start", {
        method: "POST"
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStartStatus('success');
        } else {
          setStartStatus('error');
          setErrorMessage(data.message || "Failed to start MongoDB");
        }
      } else {
        setStartStatus('error');
        setErrorMessage("Server error. Please try starting MongoDB manually.");
      }
    } catch (error) {
      setStartStatus('error');
      setErrorMessage("Connection error. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5 text-amber-500" />
          MongoDB Connection Helper
        </CardTitle>
        <CardDescription>
          Start MongoDB to use real data instead of mock data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {startStatus === 'idle' && (
          <p className="text-muted-foreground">MongoDB is not running. You can start it to use real data instead of mock data.</p>
        )}

        {startStatus === 'starting' && (
          <div className="flex flex-col items-center justify-center py-4">
            <LoadingSpinner text="Starting MongoDB..." />
          </div>
        )}

        {startStatus === 'success' && (
          <div className="flex items-center text-primary gap-2 py-2">
            <CheckCircle className="h-5 w-5" />
            <p>MongoDB started successfully! Refresh the page to connect.</p>
          </div>
        )}

        {startStatus === 'error' && (
          <div className="flex items-start gap-2 text-destructive py-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Failed to start MongoDB</p>
              <p className="text-sm">{errorMessage}</p>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>You can try to start MongoDB manually:</p>
                <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                  mongod --dbpath ~/data/db
                </pre>
                <p className="mt-2">Or using Docker:</p>
                <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">
                  docker run --name sustainapal-mongodb -p 27017:27017 -d mongo:latest
                </pre>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {(startStatus === 'idle' || startStatus === 'error') && (
          <Button onClick={startMongoDB} disabled={isStarting}>
            <Server className="mr-2 h-4 w-4" />
            Start MongoDB
          </Button>
        )}
        {startStatus === 'success' && (
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}