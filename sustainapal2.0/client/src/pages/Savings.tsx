import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSavings, updateSavingsPercentage } from "@/api/energy";
import { useToast } from "@/hooks/useToast";
import { Loader2, CreditCard } from "lucide-react";

export function Savings() {
  const [loading, setLoading] = useState(true);
  const [savingsData, setSavingsData] = useState({
    totalSaved: 0,
    savingsPercentage: 0
  });
  const [percentage] = useState(30); // fixed at 30%
  const { toast } = useToast();

  // Fun items with approximate cost
  const funItems = [
    { name: "a month of coffee at your favorite café", cost: 40 },
    { name: "a new video game", cost: 60 },
    { name: "a set of high‑quality headphones", cost: 80 },
    { name: "a dinner for two at a nice restaurant", cost: 75 },
    { name: "a smart speaker", cost: 50 },
    { name: "a year of music streaming", cost: 120 },
    { name: "tickets to a concert", cost: 100 },
    { name: "an online course", cost: 30 },
    { name: "a month of gym membership", cost: 55 }
  ];

  // Pick the most expensive fun item they can afford
  const affordable = funItems
    .filter(item => savingsData.totalSaved >= item.cost)
    .sort((a, b) => b.cost - a.cost);
  const suggestion = affordable.length > 0 ? affordable[0].name : "";

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getSavings();
      setSavingsData(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch savings data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePercentage = async () => {
    try {
      await updateSavingsPercentage({ percentage });
      toast({
        title: "Success",
        description: "Savings percentage updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update savings percentage",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paymentAmount = (savingsData.totalSaved * percentage) / 100;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Savings & Billing</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Total Saved Card */}
          <Card className="ios-card">
            <CardHeader>
              <CardTitle>Total Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <span className="text-5xl font-bold text-primary">
                  ${savingsData.totalSaved.toFixed(2)}
                </span>
                <span className="text-muted-foreground ml-2 mb-1">USD</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Great job! You've saved ${savingsData.totalSaved.toFixed(2)} through energy-efficient habits.
              </p>

              {suggestion && (
                <p className="text-sm text-muted-foreground mt-1">
                  With that, you could treat yourself to {suggestion}.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Apply Savings Card */}
          <Card className="ios-card">
            <CardHeader>
              <CardTitle>Apply Savings to Your Bill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Percentage of savings to apply</span>
                    <span className="text-sm font-bold">{percentage}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Amount to pay</p>
                    <p className="text-2xl font-bold">
                      ${paymentAmount.toFixed(2)}
                    </p>
                  </div>
                  <Button onClick={handleUpdatePercentage} className="ios-button-primary">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
