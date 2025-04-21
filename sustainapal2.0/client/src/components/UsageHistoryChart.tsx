import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

interface UsageHistoryChartProps {
  data: Array<{
    date: string;
    usage: number;
  }>;
}

export function UsageHistoryChart({ data }: UsageHistoryChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM dd')
  }));

  return (
    <Card className="ios-card">
      <CardHeader>
        <CardTitle>Daily Energy Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `${value} kWh`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [`${value} kWh`, 'Usage']}
                labelStyle={{ color: 'var(--foreground)' }}
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}