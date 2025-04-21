import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnergyGauge } from "@/components/EnergyGauge";
import { RefreshButton } from "@/components/RefreshButton";
import { UsageCategoryCard } from "@/components/UsageCategoryCard";
import { UsageHistoryChart } from "@/components/UsageHistoryChart";
import { getCurrentEnergyUsage } from "@/api/energy";
import { getUsageByCategory } from "@/api/usage";
import { useToast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";
import { MongoDBStatusAlert } from "@/components/MongoDBStatusAlert";
import { MongoDBStartupHelper } from "@/components/MongoDBStartupHelper";

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [energyData, setEnergyData] = useState({
    currentUsage: 0,
    dailyGoal: 0,
    costSoFar: 0,
    predictedBill: 0
  });
  const [usageData, setUsageData] = useState({
    provider: "",
    usageByCategory: [],
    usageHistory: []
  });
  const [dbConnected, setDbConnected] = useState(true);
  const { toast } = useToast();

  // Check MongoDB connection status
  useEffect(() => {
    const checkDbStatus = async () => {
      try {
        const response = await fetch("/api/status");
        if (response.ok) {
          const data = await response.json();
          setDbConnected(data.mongodb.connected);
        } else {
          setDbConnected(false);
        }
      } catch (error) {
        setDbConnected(false);
      }
    };

    checkDbStatus();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const energyResponse = await getCurrentEnergyUsage();
      const usageResponse = await getUsageByCategory();

      setEnergyData(energyResponse);
      setUsageData(usageResponse);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch energy data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <MongoDBStatusAlert />

      {!dbConnected && <MongoDBStartupHelper />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Today's Energy Use</h1>
          <p className="text-muted-foreground mt-1">Provider: {usageData.provider || "Eversource"}</p>
        </div>
        <RefreshButton onRefresh={fetchData} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Card className="ios-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Energy Usage vs. Daily Goal</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <EnergyGauge
                currentUsage={energyData.currentUsage}
                dailyGoal={energyData.dailyGoal}
              />
            </CardContent>
          </Card>

          <UsageHistoryChart data={usageData.usageHistory} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="ios-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cost So Far Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${energyData.costSoFar.toFixed(2)}</span>
                  <span className="text-muted-foreground ml-2 mb-1">USD</span>
                </div>
              </CardContent>
            </Card>

            <Card className="ios-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Predicted Monthly Bill</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${energyData.predictedBill.toFixed(2)}</span>
                  <span className="text-muted-foreground ml-2 mb-1">USD</span>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></div>
                  <span className="text-xs text-muted-foreground">Powered by Core ML</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Usage by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {usageData.usageByCategory.map((category, index) => (
                <UsageCategoryCard
                  key={index}
                  category={category.category}
                  usage={category.usage}
                  cost={category.cost}
                  icon={category.icon}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}