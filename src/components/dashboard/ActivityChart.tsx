import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", users: 1200 },
  { time: "04:00", users: 800 },
  { time: "08:00", users: 2400 },
  { time: "12:00", users: 3800 },
  { time: "16:00", users: 3200 },
  { time: "20:00", users: 2800 },
  { time: "23:59", users: 1600 },
];

export const ActivityChart = () => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-xl font-semibold">User Activity (24h)</CardTitle>
        <p className="text-sm text-muted-foreground">Active users throughout the day</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={270}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis 
              dataKey="time" 
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
            <Area
              type="monotone"
              dataKey="users"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
