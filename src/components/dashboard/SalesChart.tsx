import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { category: "Electronics", sales: 45000, target: 40000 },
  { category: "Clothing", sales: 38000, target: 35000 },
  { category: "Food", sales: 52000, target: 48000 },
  { category: "Books", sales: 28000, target: 30000 },
  { category: "Sports", sales: 35000, target: 32000 },
  { category: "Home", sales: 42000, target: 40000 },
];

export const SalesChart = () => {
  return (
    <Card className="col-span-full lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-xl font-semibold">Sales by Category</CardTitle>
        <p className="text-sm text-muted-foreground">Performance vs targets across categories</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1}/>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={1}/>
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis 
              dataKey="category" 
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
            <Bar 
              dataKey="sales" 
              fill="url(#salesGradient)" 
              name="Actual Sales"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="target" 
              fill="url(#targetGradient)" 
              name="Target"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
