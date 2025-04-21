import { useState, useEffect } from "react";
import { getSavingTips } from "@/api/energy";
import { TipCard } from "@/components/TipCard";
import { useToast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";

export function Insights() {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getSavingTips();
      setTips(data.tips);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch saving tips",
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
      <h1 className="text-3xl font-bold">Saving Tips for You</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <TipCard
              key={tip.id}
              title={tip.title}
              savings={tip.savings}
              icon={tip.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}