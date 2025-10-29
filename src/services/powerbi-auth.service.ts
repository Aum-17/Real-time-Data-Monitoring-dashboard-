import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { powerBIConfig } from '@/config/powerbi.config';

class PowerBIAuthService {
  private msalInstance: PublicClientApplication | null = null;
  private account: AccountInfo | null = null;

  async initialize() {
    try {
      this.msalInstance = new PublicClientApplication({
        auth: powerBIConfig.auth,
        cache: {
          cacheLocation: 'sessionStorage',
          storeAuthStateInCookie: false,
        },
      });

      await this.msalInstance.initialize();
      const accounts = this.msalInstance.getAllAccounts();
      
      if (accounts.length > 0) {
        this.account = accounts[0];
      }
    } catch (error) {
      console.error('Failed to initialize MSAL:', error);
      throw error;
    }
  }

  async login(): Promise<AccountInfo> {
    if (!this.msalInstance) {
      throw new Error('MSAL not initialized');
    }

    try {
      const loginResponse = await this.msalInstance.loginPopup({
        scopes: powerBIConfig.scopes,
      });

      this.account = loginResponse.account;
      return loginResponse.account;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout() {
    if (!this.msalInstance) {
      throw new Error('MSAL not initialized');
    }

    await this.msalInstance.logoutPopup();
    this.account = null;
  }

  async getAccessToken(): Promise<string> {
    if (!this.msalInstance || !this.account) {
      throw new Error('Not authenticated');
    }

    try {
      const response: AuthenticationResult = await this.msalInstance.acquireTokenSilent({
        scopes: powerBIConfig.scopes,
        account: this.account,
      });

      return response.accessToken;
    } catch (error) {
      console.error('Silent token acquisition failed, trying popup:', error);
      
      try {
        const response = await this.msalInstance.acquireTokenPopup({
          scopes: powerBIConfig.scopes,
        });
        return response.accessToken;
      } catch (popupError) {
        console.error('Popup token acquisition failed:', popupError);
        throw popupError;
      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.account;
  }

  getAccount(): AccountInfo | null {
    return this.account;
  }
}

export const powerBIAuthService = new PowerBIAuthService();
