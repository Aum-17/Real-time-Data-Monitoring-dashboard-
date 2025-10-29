import { powerBIConfig } from '@/config/powerbi.config';
import { powerBIAuthService } from './powerbi-auth.service';

export interface PowerBIReport {
  id: string;
  name: string;
  embedUrl: string;
  datasetId: string;
}

export interface PowerBIDataset {
  id: string;
  name: string;
  tables: Array<{ name: string }>;
}

class PowerBIAPIService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = await powerBIAuthService.getAccessToken();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getReports(): Promise<PowerBIReport[]> {
    const url = `${powerBIConfig.api.baseUrl}/groups/${powerBIConfig.powerBI.workspaceId}/reports`;
    const data = await this.fetchWithAuth(url);
    return data.value || [];
  }

  async getReport(reportId: string): Promise<PowerBIReport> {
    const url = `${powerBIConfig.api.baseUrl}/groups/${powerBIConfig.powerBI.workspaceId}/reports/${reportId}`;
    return this.fetchWithAuth(url);
  }

  async getDatasets(): Promise<PowerBIDataset[]> {
    const url = `${powerBIConfig.api.baseUrl}/groups/${powerBIConfig.powerBI.workspaceId}/datasets`;
    const data = await this.fetchWithAuth(url);
    return data.value || [];
  }

  async getEmbedToken(reportId: string): Promise<string> {
    const url = `${powerBIConfig.api.baseUrl}/groups/${powerBIConfig.powerBI.workspaceId}/reports/${reportId}/GenerateToken`;
    
    const body = {
      accessLevel: 'View',
      allowSaveAs: false,
    };

    const data = await this.fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return data.token;
  }

  async refreshDataset(datasetId: string): Promise<void> {
    const url = `${powerBIConfig.api.baseUrl}/groups/${powerBIConfig.powerBI.workspaceId}/datasets/${datasetId}/refreshes`;
    
    await this.fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify({ notifyOption: 'NoNotification' }),
    });
  }

  async executeQuery(datasetId: string, dax: string): Promise<any> {
    const url = `${powerBIConfig.api.baseUrl}/groups/${powerBIConfig.powerBI.workspaceId}/datasets/${datasetId}/executeQueries`;
    
    const body = {
      queries: [{ query: dax }],
      serializerSettings: { includeNulls: true },
    };

    return this.fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const powerBIAPIService = new PowerBIAPIService();
