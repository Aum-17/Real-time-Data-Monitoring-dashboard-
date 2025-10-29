import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

const Index = () => {
  const [metrics, setMetrics] = useState({
    revenue: 88450,
    users: 3842,
    orders: 2156,
    growth: 23.5,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        revenue: prev.revenue + Math.floor(Math.random() * 100) - 50,
        users: prev.users + Math.floor(Math.random() * 10) - 5,
        orders: prev.orders + Math.floor(Math.random() * 5) - 2,
        growth: Number((prev.growth + (Math.random() - 0.5) * 0.5).toFixed(1)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        <DashboardHeader />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8 relative">
          <MetricCard
            title="Total Revenue"
            value={metrics.revenue}
            unit="$"
            icon={DollarSign}
            trend={12.5}
            color="primary"
          />
          <MetricCard
            title="Active Users"
            value={metrics.users}
            icon={Users}
            trend={8.2}
            color="success"
          />
          <MetricCard
            title="Total Orders"
            value={metrics.orders}
            icon={ShoppingCart}
            trend={-3.4}
            color="warning"
          />
          <MetricCard
            title="Growth Rate"
            value={metrics.growth}
            unit="%"
            icon={TrendingUp}
            trend={5.1}
            color="success"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8 relative">
          <RevenueChart />
          <SalesChart />
        </div>

        <div className="grid gap-6 md:grid-cols-2 relative">
          <ActivityChart />
          <ActivityChart />
        </div>
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Last updated: {new Date().toLocaleTimeString()} • Data refreshes every 3 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
