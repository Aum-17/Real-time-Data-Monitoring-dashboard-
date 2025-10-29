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
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="category" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="hsl(var(--primary))" name="Actual Sales" />
            <Bar dataKey="target" fill="hsl(var(--secondary))" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
