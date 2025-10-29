import { useState, useEffect } from 'react';
import { AccountInfo } from '@azure/msal-browser';
import { powerBIAuthService } from '@/services/powerbi-auth.service';
import { isDemoMode } from '@/config/powerbi.config';
import { toast } from '@/hooks/use-toast';

export const usePowerBIAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const demoMode = isDemoMode();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    if (demoMode) {
      setIsLoading(false);
      return;
    }

    try {
      await powerBIAuthService.initialize();
      const authenticated = powerBIAuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setAccount(powerBIAuthService.getAccount());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication initialization failed');
      toast({
        title: "Authentication Error",
        description: "Failed to initialize Power BI authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (demoMode) {
      toast({
        title: "Demo Mode",
        description: "Please configure Power BI credentials to enable authentication",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const accountInfo = await powerBIAuthService.login();
      setAccount(accountInfo);
      setIsAuthenticated(true);
      setError(null);
      toast({
        title: "Success",
        description: "Successfully authenticated with Power BI",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      toast({
        title: "Login Failed",
        description: err instanceof Error ? err.message : 'Failed to authenticate',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await powerBIAuthService.logout();
      setAccount(null);
      setIsAuthenticated(false);
      setError(null);
      toast({
        title: "Logged Out",
        description: "Successfully logged out from Power BI",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    account,
    isLoading,
    error,
    login,
    logout,
    demoMode,
  };
};
