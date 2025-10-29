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
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue & Profit Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
