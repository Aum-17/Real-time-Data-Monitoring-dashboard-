import { useState } from 'react';
import { PowerBIReport } from '@/components/powerbi/PowerBIReport';
import { PowerBIConfig } from '@/components/powerbi/PowerBIConfig';
import { usePowerBIAuth } from '@/hooks/usePowerBIAuth';
import { usePowerBIReports } from '@/hooks/usePowerBIData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, FileText, AlertCircle } from 'lucide-react';
import { powerBIConfig } from '@/config/powerbi.config';

const PowerBIView = () => {
  const { isAuthenticated, demoMode } = usePowerBIAuth();
  const { reports } = usePowerBIReports();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const workspaceId = powerBIConfig.powerBI.workspaceId;
  const defaultReportId = powerBIConfig.powerBI.reportId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
              Power BI Integration
            </h1>
            <p className="text-muted-foreground mt-2">
              Connect and embed your Power BI reports and dashboards
            </p>
          </div>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            {demoMode ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Power BI integration is in demo mode. Please configure your credentials in the Configuration tab to view actual reports.
                </AlertDescription>
              </Alert>
            ) : !isAuthenticated ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please sign in to Microsoft in the Configuration tab to view your Power BI reports.
                </AlertDescription>
              </Alert>
            ) : reports.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No reports found in your workspace. Make sure you have reports published to your Power BI workspace.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-6">
                {/* Report Selector */}
                <Card className="p-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-medium">Select Report:</span>
                    {reports.map((report) => (
                      <Button
                        key={report.id}
                        variant={selectedReportId === report.id ? "default" : "outline"}
                        onClick={() => setSelectedReportId(report.id)}
                        size="sm"
                      >
                        {report.name}
                      </Button>
                    ))}
                    {!selectedReportId && defaultReportId && (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedReportId(defaultReportId)}
                        size="sm"
                      >
                        Load Default Report
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Report Embed */}
                {selectedReportId && (
                  <PowerBIReport
                    reportId={selectedReportId}
                    workspaceId={workspaceId}
                  />
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="config">
            <PowerBIConfig />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PowerBIView;
