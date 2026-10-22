import {
  AuthUser,
  AuthResponse,
  UserSession,
  RoleType,
} from '@rental-platform/types';

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role: RoleType;
  termsAccepted: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class AuthService {
  private baseUrl = '/api/v1/auth';

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Includes HttpOnly session/access cookies
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        data?.message || data?.error || `Request failed with status ${response.status}`;
      const error = new Error(Array.isArray(message) ? message.join('. ') : message);
      (error as any).status = response.status;
      (error as any).data = data;
      throw error;
    }

    return data as T;
  }

  async register(payload: RegisterPayload): Promise<{ message: string; requiresVerification: boolean; email: string }> {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async logout(): Promise<{ message: string }> {
    return this.request('/logout', {
      method: 'POST',
    });
  }

  async getMe(): Promise<{ user: AuthUser }> {
    return this.request('/me', {
      method: 'GET',
    });
  }

  async verifyEmail(token: string): Promise<{ message: string; verified: boolean; email?: string }> {
    return this.request('/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async resendVerification(email: string): Promise<{ message: string }> {
    return this.request('/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    return this.request('/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async changePassword(payload: ChangePasswordPayload): Promise<{ message: string }> {
    return this.request('/change-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getSessions(): Promise<{ sessions: UserSession[] }> {
    return this.request('/sessions', {
      method: 'GET',
    });
  }

  async revokeSession(id: string): Promise<{ message: string }> {
    return this.request(`/sessions/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  }
}

export const authService = new AuthService();
