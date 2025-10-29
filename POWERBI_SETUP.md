# Power BI Integration Setup Guide

This dashboard now includes full Power BI integration capabilities. Follow these steps to connect your Power BI reports.

## Prerequisites

- Azure subscription
- Power BI Pro or Premium license
- Published Power BI reports in a workspace

## Setup Steps

### 1. Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: `PowerBI Dashboard App`
   - **Supported account types**: Select appropriate option for your organization
   - **Redirect URI**: Add your application URL (e.g., `http://localhost:8080` for development)
5. Click **Register**

### 2. Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Power BI Service**
4. Select **Delegated permissions**
5. Add these permissions:
   - `Report.Read.All`
   - `Dataset.Read.All`
   - `Dashboard.Read.All`
   - `Workspace.Read.All`
6. Click **Grant admin consent** (if required)

### 3. Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and select expiration period
4. Click **Add**
5. **Important**: Copy the secret value immediately (you won't be able to see it again)

### 4. Get Power BI IDs

1. Go to [Power BI Service](https://app.powerbi.com)
2. Navigate to your workspace
3. Get the **Workspace ID** from the URL: `https://app.powerbi.com/groups/{workspace-id}/...`
4. Open a report and get the **Report ID** from the URL: `.../reports/{report-id}/...`
5. Get the **Dataset ID** from report settings or dataset details

### 5. Configure Environment Variables

Create or update your environment configuration with these variables:

```env
VITE_POWERBI_CLIENT_ID=your-azure-client-id
VITE_POWERBI_TENANT_ID=your-azure-tenant-id
VITE_POWERBI_WORKSPACE_ID=your-workspace-id
VITE_POWERBI_REPORT_ID=your-default-report-id
VITE_POWERBI_DATASET_ID=your-dataset-id
```

**Where to find these values:**

- **Client ID**: From Azure AD App Registration (Application ID)
- **Tenant ID**: From Azure AD App Registration (Directory ID)
- **Workspace ID**: From Power BI Service URL
- **Report ID**: From Power BI Service URL
- **Dataset ID**: From Power BI dataset settings

### 6. Configure Redirect URIs in Azure

1. Go back to your Azure AD App Registration
2. Navigate to **Authentication**
3. Add these redirect URIs:
   - Development: `http://localhost:8080`
   - Production: Your deployed application URL
4. Enable **Access tokens** and **ID tokens** under Implicit grant
5. Save changes

## Using the Integration

### Access the Power BI Integration

1. Click the **"Power BI Integration"** button in the dashboard header
2. Or navigate to `/powerbi` route directly

### Authentication

1. Go to the **Configuration** tab
2. Click **"Sign In with Microsoft"**
3. Authenticate with your Microsoft account
4. Grant permissions when prompted

### View Reports

1. After authentication, go to the **Reports** tab
2. Your available reports will be listed
3. Click on any report to embed and view it
4. Use Power BI's built-in filters and navigation

### Manage Datasets

1. In the Configuration tab, view your datasets
2. Click the refresh icon to trigger dataset refresh
3. Monitor dataset status

## Features

### Available Features

- ✅ Embed Power BI reports
- ✅ Microsoft authentication (MSAL)
- ✅ List available reports and datasets
- ✅ Trigger dataset refresh
- ✅ Interactive report filtering
- ✅ Real-time data updates
- ✅ Hybrid dashboard (combining custom charts + Power BI)

### Upcoming Features

- 📋 Export reports to PDF/Image
- 📋 Scheduled refresh
- 📋 Custom DAX queries
- 📋 Cross-filtering between custom and Power BI charts
- 📋 Streaming datasets integration

## Troubleshooting

### Common Issues

**Issue: "Authentication failed"**
- Verify your Client ID and Tenant ID are correct
- Check that API permissions are granted
- Ensure redirect URIs match exactly

**Issue: "No reports found"**
- Verify the Workspace ID is correct
- Ensure you have access to the workspace
- Check that reports are published

**Issue: "Failed to load report"**
- Verify the Report ID is correct
- Check that the embed token is valid
- Ensure Power BI Service API permissions are granted

**Issue: "CORS errors"**
- Add your domain to Power BI embed allowed domains
- Check browser console for specific CORS issues

## Security Best Practices

1. **Never commit credentials**: Always use environment variables
2. **Use client secrets**: Don't hardcode passwords or tokens
3. **Rotate secrets regularly**: Set expiration dates for client secrets
4. **Limit permissions**: Only grant necessary API permissions
5. **Use HTTPS**: Always use secure connections in production
6. **Validate tokens**: Implement proper token validation and refresh logic

## Demo Mode

If environment variables are not configured, the application runs in **demo mode**:
- Shows configuration instructions
- Displays sample data in custom charts
- Power BI features are disabled

## Resources

- [Power BI Embedded Documentation](https://docs.microsoft.com/en-us/power-bi/developer/embedded/)
- [Power BI REST API Reference](https://docs.microsoft.com/en-us/rest/api/power-bi/)
- [Azure AD App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)

## Support

For issues or questions:
1. Check the Configuration tab for real-time status
2. Review browser console for error messages
3. Verify all environment variables are set correctly
4. Ensure Azure AD and Power BI permissions are configured
