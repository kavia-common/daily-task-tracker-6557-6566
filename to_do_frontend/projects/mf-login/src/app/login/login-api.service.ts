import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, throwError } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * API base URL injection token for the login remote.
 * Configure this using an environment variable bridged via window or DI in host.
 */
export const LOGIN_API_BASE = new InjectionToken<string>('LOGIN_API_BASE');

/** PUBLIC_INTERFACE */
export interface LoginCredentials {
  /** User email address */
  email: string;
  /** Plain text password to be sent over HTTPS */
  password: string;
  /** Optional remember-me flag to request longer session */
  remember?: boolean;
}

/** PUBLIC_INTERFACE */
export interface LoginResponse {
  /** Indicates success/failure of the login operation */
  success: boolean;
  /** Optional display message from the server */
  message?: string;
  /** Access token (when success is true) */
  token?: string;
}

/**
 * PUBLIC_INTERFACE
 * LoginApiService handles authentication calls to the backend.
 * Currently hits a placeholder endpoint to be wired in step 2.3.
 * Base URL is provided via LOGIN_API_BASE token to avoid hardcoding config.
 */
@Injectable({ providedIn: 'root' })
export class LoginApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(LOGIN_API_BASE, { optional: true }) ?? readWindowVar('NG_APP_API_BASE') ?? '';

  /**
   * PUBLIC_INTERFACE
   * Perform login request against backend placeholder.
   * For step 2.2 we simulate latency and return a mocked response when email includes "ok".
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    // Placeholder behavior until step 2.3 wires real backend:
    // - If email contains "ok", resolve success; otherwise error with message.
    const simulateMs = 900;
    if (credentials.email?.toLowerCase().includes('ok')) {
      return of({
        success: true,
        message: 'Logged in (simulated)',
        token: 'mock-token'
      }).pipe(delay(simulateMs));
    }
    return throwError(() => ({
      success: false,
      message: 'Invalid email or password (simulated)'
    })).pipe();
  }

  /**
   * Example real call for step 2.3 (kept here for reference and will be switched on then):
   *
   * private realLogin(credentials: LoginCredentials): Observable<LoginResponse> {
   *   const url = this.joinUrl(this.baseUrl, '/auth/login');
   *   return this.http.post<LoginResponse>(url, credentials, { withCredentials: true });
   * }
   */

  private joinUrl(base: string | undefined, path: string): string {
    if (!base) return path;
    return `${base.replace(/\/+$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}

/** Safe global window reader to avoid linter errors in non-browser contexts. */
function readWindowVar<T = any>(key: string): T | undefined {
  try {
    // eslint-disable-next-line no-undef
    const w = (globalThis as any)?.window ?? undefined;
    if (!w) return undefined;
    return w[key] as T | undefined;
  } catch {
    return undefined;
  }
}
