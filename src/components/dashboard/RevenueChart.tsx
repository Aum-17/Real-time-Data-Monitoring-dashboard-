import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", revenue: 45000, profit: 32000 },
  { month: "Feb", revenue: 52000, profit: 38000 },
  { month: "Mar", revenue: 48000, profit: 35000 },
  { month: "Apr", revenue: 61000, profit: 44000 },
  { month: "May", revenue: 55000, profit: 40000 },
  { month: "Jun", revenue: 67000, profit: 49000 },
  { month: "Jul", revenue: 72000, profit: 53000 },
  { month: "Aug", revenue: 68000, profit: 50000 },
  { month: "Sep", revenue: 75000, profit: 55000 },
  { month: "Oct", revenue: 82000, profit: 61000 },
  { month: "Nov", revenue: 78000, profit: 57000 },
  { month: "Dec", revenue: 88000, profit: 65000 },
];

export const RevenueChart = () => {
  return (
    <Card className="col-span-full lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-xl font-semibold">Revenue & Profit Trends</CardTitle>
        <p className="text-sm text-muted-foreground">Year-over-year performance comparison</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis 
              dataKey="month" 
              className="text-xs" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                boxShadow: "0 4px 12px hsl(var(--primary) / 0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="Revenue"
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              name="Profit"
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
