import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { usePowerBIAuth } from '@/hooks/usePowerBIAuth';
import { usePowerBIReports, usePowerBIDatasets } from '@/hooks/usePowerBIData';
import { Loader2, AlertCircle, CheckCircle2, RefreshCw, LogIn, LogOut, Database, FileText } from 'lucide-react';

export const PowerBIConfig = () => {
  const { isAuthenticated, account, isLoading: authLoading, login, logout, demoMode } = usePowerBIAuth();
  const { reports, isLoading: reportsLoading, refetch: refetchReports } = usePowerBIReports();
  const { datasets, isLoading: datasetsLoading, refetch: refetchDatasets, refreshDataset } = usePowerBIDatasets();

  if (demoMode) {
    return (
      <Card className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="mt-2">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Power BI Configuration Required</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  To connect to Power BI, you need to configure the following environment variables:
                </p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="font-mono bg-muted p-2 rounded">
                  VITE_POWERBI_CLIENT_ID=your-azure-client-id
                </div>
                <div className="font-mono bg-muted p-2 rounded">
                  VITE_POWERBI_TENANT_ID=your-azure-tenant-id
                </div>
                <div className="font-mono bg-muted p-2 rounded">
                  VITE_POWERBI_WORKSPACE_ID=your-workspace-id
                </div>
                <div className="font-mono bg-muted p-2 rounded">
                  VITE_POWERBI_REPORT_ID=your-report-id
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-semibold text-sm mb-2">Setup Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Create an Azure AD App Registration in Azure Portal</li>
                  <li>Configure API permissions for Power BI Service</li>
                  <li>Get your Workspace and Report IDs from Power BI Service</li>
                  <li>Add the environment variables to your project</li>
                </ol>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Authentication Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Authentication</h3>
            <Badge variant={isAuthenticated ? "default" : "secondary"}>
              {isAuthenticated ? (
                <>
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connected
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Not Connected
                </>
              )}
            </Badge>
          </div>
          
          {authLoading ? (
            <Button disabled>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </Button>
          ) : isAuthenticated ? (
            <Button onClick={logout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button onClick={login}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In with Microsoft
            </Button>
          )}
        </div>
        
        {account && (
          <div className="text-sm text-muted-foreground">
            Signed in as: <span className="font-medium">{account.username}</span>
          </div>
        )}
      </Card>

      {isAuthenticated && (
        <>
          {/* Reports */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Reports</h3>
                <Badge variant="secondary">{reports.length}</Badge>
              </div>
              <Button onClick={refetchReports} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {reportsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : reports.length > 0 ? (
              <div className="space-y-2">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="font-medium">{report.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">
                      ID: {report.id}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reports found in workspace</p>
            )}
          </Card>

          {/* Datasets */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Datasets</h3>
                <Badge variant="secondary">{datasets.length}</Badge>
              </div>
              <Button onClick={refetchDatasets} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {datasetsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : datasets.length > 0 ? (
              <div className="space-y-2">
                {datasets.map((dataset) => (
                  <div
                    key={dataset.id}
                    className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{dataset.name}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">
                          ID: {dataset.id}
                        </div>
                      </div>
                      <Button
                        onClick={() => refreshDataset(dataset.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No datasets found in workspace</p>
            )}
          </Card>
        </>
      )}
    </div>
  );
};
