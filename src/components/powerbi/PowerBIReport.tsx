import { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { powerBIAPIService } from '@/services/powerbi-api.service';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

interface PowerBIReportProps {
  reportId: string;
  workspaceId: string;
  className?: string;
}

export const PowerBIReport = ({ reportId, workspaceId, className }: PowerBIReportProps) => {
  const [embedConfig, setEmbedConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReportConfig();
  }, [reportId, workspaceId]);

  const loadReportConfig = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch report details and embed token
      const reportData = await powerBIAPIService.getReport(reportId);
      const embedToken = await powerBIAPIService.getEmbedToken(reportId);

      // Configure embed settings
      const config = {
        type: 'report',
        id: reportId,
        embedUrl: reportData.embedUrl,
        accessToken: embedToken,
        tokenType: models.TokenType.Embed,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: true,
            },
            pageNavigation: {
              visible: true,
            },
          },
          background: models.BackgroundType.Transparent,
        },
      };

      setEmbedConfig(config);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Card className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (isLoading || !embedConfig) {
    return (
      <Card className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading Power BI report...</p>
          </div>
        </div>
        <div className="w-full min-h-[600px]" />
      </Card>
    );
  }

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <PowerBIEmbed
        embedConfig={embedConfig}
        eventHandlers={
          new Map([
            ['loaded', () => console.log('Report loaded')],
            ['rendered', () => console.log('Report rendered')],
            ['error', (event: any) => {
              console.error('Report error:', event?.detail);
              setError(event?.detail?.message || 'An error occurred');
            }],
          ])
        }
        cssClassName="w-full min-h-[600px]"
        getEmbeddedComponent={(embeddedReport) => {
          console.log('Embedded report object:', embeddedReport);
        }}
      />
    </Card>
  );
};
