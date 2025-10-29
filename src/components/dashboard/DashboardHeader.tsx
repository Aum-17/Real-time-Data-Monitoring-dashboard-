import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DashboardHeader = () => {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being generated...",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 animate-slide-up">
      <div className="space-y-1">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground text-lg flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
          Real-time monitoring and business intelligence
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          className="hover:bg-primary/5 hover:text-primary transition-all hover:scale-105"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button 
          size="sm" 
          onClick={handleExport}
          className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all hover:scale-105"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
