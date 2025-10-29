import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  trend?: number;
  color?: "primary" | "success" | "warning" | "destructive";
}

export const MetricCard = ({
  title,
  value,
  unit = "",
  icon: Icon,
  trend,
  color = "primary",
}: MetricCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const colorClasses = {
    primary: "bg-gradient-to-br from-primary/20 to-primary/10 text-primary",
    success: "bg-gradient-to-br from-success/20 to-success/10 text-success",
    warning: "bg-gradient-to-br from-warning/20 to-warning/10 text-warning",
    destructive: "bg-gradient-to-br from-destructive/20 to-destructive/10 text-destructive",
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`rounded-xl p-3 ${colorClasses[color]} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          {displayValue.toLocaleString()}
          {unit}
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <span
              className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-full ${
                trend >= 0 
                  ? "bg-success/10 text-success" 
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </span>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
