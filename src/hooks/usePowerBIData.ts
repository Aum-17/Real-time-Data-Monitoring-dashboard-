import { useState, useEffect } from 'react';
import { powerBIAPIService, PowerBIReport, PowerBIDataset } from '@/services/powerbi-api.service';
import { toast } from '@/hooks/use-toast';
import { isDemoMode } from '@/config/powerbi.config';

export const usePowerBIReports = () => {
  const [reports, setReports] = useState<PowerBIReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const demoMode = isDemoMode();

  const fetchReports = async () => {
    if (demoMode) return;

    setIsLoading(true);
    try {
      const data = await powerBIAPIService.getReports();
      setReports(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch reports';
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!demoMode) {
      fetchReports();
    }
  }, [demoMode]);

  return { reports, isLoading, error, refetch: fetchReports };
};

export const usePowerBIDatasets = () => {
  const [datasets, setDatasets] = useState<PowerBIDataset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const demoMode = isDemoMode();

  const fetchDatasets = async () => {
    if (demoMode) return;

    setIsLoading(true);
    try {
      const data = await powerBIAPIService.getDatasets();
      setDatasets(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch datasets';
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshDataset = async (datasetId: string) => {
    try {
      await powerBIAPIService.refreshDataset(datasetId);
      toast({
        title: "Success",
        description: "Dataset refresh triggered successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to refresh dataset",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!demoMode) {
      fetchDatasets();
    }
  }, [demoMode]);

  return { datasets, isLoading, error, refetch: fetchDatasets, refreshDataset };
};
