import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  /** Optional minimal user profile */
  user?: { id: string; email: string; createdAt?: string };
}

/**
 * PUBLIC_INTERFACE
 * LoginApiService handles authentication calls to the backend.
 * Base URL is provided via LOGIN_API_BASE token to avoid hardcoding config.
 */
@Injectable({ providedIn: 'root' })
export class LoginApiService {
  private http = inject(HttpClient);
  // Prefer DI token, then window var, finally default to localhost:3001 as guard fallback.
  private baseUrl =
    inject(LOGIN_API_BASE, { optional: true }) ??
    readWindowVar('NG_APP_API_BASE') ??
    'http://localhost:3001';

  /** PUBLIC_INTERFACE: Perform login request against backend. */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    const url = this.joinUrl(this.baseUrl, '/api/auth/login');
    return this.http.post<LoginResponse>(url, credentials, { withCredentials: true });
  }

  /** PUBLIC_INTERFACE: Perform register request against backend. */
  register(credentials: LoginCredentials): Observable<LoginResponse> {
    const url = this.joinUrl(this.baseUrl, '/api/auth/register');
    return this.http.post<LoginResponse>(url, credentials, { withCredentials: true });
  }

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
