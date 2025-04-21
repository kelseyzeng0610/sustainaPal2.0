import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBillForecast } from "@/api/energy";
import { useToast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function CostForecast() {
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState({
    forecast: 0,
    history: []
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getBillForecast();
      setForecastData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch forecast data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [...forecastData.history, {
    month: 'May',
    amount: forecastData.forecast,
    isForecast: true
  }];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Next Month's Bill Forecast</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Card className="ios-card">
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(value) => `$${value}`}
                      domain={[0, 'dataMax + 10']}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}`, 'Amount']}
                      labelStyle={{ color: 'var(--foreground)' }}
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)',
                        borderRadius: 'var(--radius)',
                      }}
                    />
                    <Bar
                      dataKey="amount"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      fillOpacity={(entry) => (entry.isForecast ? 0.7 : 1)}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium">Forecast</h3>
                  <div className="flex items-end mt-2">
                    <span className="text-4xl font-bold">${forecastData.forecast.toFixed(2)}</span>
                    <span className="text-muted-foreground ml-2 mb-1">USD</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></div>
                    <span className="text-xs text-muted-foreground">Powered by Core ML</span>
                  </div>
                </div>
                <Button
                  className="ios-button-secondary"
                  onClick={() => navigate("/insights")}
                >
                  See Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}