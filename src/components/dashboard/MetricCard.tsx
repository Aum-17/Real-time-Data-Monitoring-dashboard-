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
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {displayValue.toLocaleString()}
          {unit}
        </div>
        {trend !== undefined && (
          <p
            className={`text-xs mt-1 ${
              trend >= 0 ? "text-success" : "text-destructive"
            }`}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% from last period
          </p>
        )}
      </CardContent>
    </Card>
  );
};
