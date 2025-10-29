import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, ShoppingCart, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="container mx-auto p-6 relative z-10 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <DashboardHeader />
          <Button onClick={() => navigate('/powerbi')} className="gap-2">
            <Zap className="h-4 w-4" />
            Power BI Integration
          </Button>
        </div>

        <Tabs defaultValue="realtime" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Real-Time Metrics
            </TabsTrigger>
            <TabsTrigger value="hybrid" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Hybrid View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

            <div className="grid gap-6 md:grid-cols-2">
              <RevenueChart />
              <SalesChart />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ActivityChart />
              <ActivityChart />
            </div>
            
            {/* Footer with timestamp */}
            <div className="text-center text-sm text-muted-foreground py-4 border-t border-border/50">
              <p>Last updated: {new Date().toLocaleTimeString()} • Data refreshes every 3 seconds</p>
            </div>
          </TabsContent>

          <TabsContent value="hybrid" className="space-y-6 mt-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-2">Hybrid Dashboard Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                Combine real-time metrics with Power BI reports in a unified view
              </p>
              <Button onClick={() => navigate('/powerbi')}>
                <Zap className="h-4 w-4 mr-2" />
                Configure Power BI Integration
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
