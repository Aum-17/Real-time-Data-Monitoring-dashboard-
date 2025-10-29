// Power BI Configuration
// Replace these with your actual Azure AD and Power BI details

export const powerBIConfig = {
  // Azure AD App Registration
  auth: {
    clientId: import.meta.env.VITE_POWERBI_CLIENT_ID || 'your-client-id-here',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_POWERBI_TENANT_ID || 'your-tenant-id-here'}`,
    redirectUri: window.location.origin,
  },
  
  // Power BI API Scopes
  scopes: ['https://analysis.windows.net/powerbi/api/.default'],
  
  // Power BI Service Configuration
  powerBI: {
    workspaceId: import.meta.env.VITE_POWERBI_WORKSPACE_ID || 'your-workspace-id-here',
    reportId: import.meta.env.VITE_POWERBI_REPORT_ID || 'your-report-id-here',
    datasetId: import.meta.env.VITE_POWERBI_DATASET_ID || 'your-dataset-id-here',
  },
  
  // API Configuration
  api: {
    baseUrl: 'https://api.powerbi.com/v1.0/myorg',
  },
  
  // Embed Configuration
  embed: {
    type: 'report', // 'report' | 'dashboard' | 'tile'
    embedUrl: '', // Will be fetched dynamically
    tokenType: 1, // 1 = Embed token, 0 = AAD token
    permissions: 7, // All = 7, Read = 0, ReadWrite = 2, Copy = 1
  },
};

export const isDemoMode = () => {
  return !import.meta.env.VITE_POWERBI_CLIENT_ID || 
         import.meta.env.VITE_POWERBI_CLIENT_ID === 'your-client-id-here';
};
