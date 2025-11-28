import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * API base URL injection token for tasks API.
 */
export const TASKS_API_BASE = new InjectionToken<string>('TASKS_API_BASE');

/** PUBLIC_INTERFACE */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'done';
  dueDate?: string; // ISO
  createdAt?: string;
  updatedAt?: string;
}

/**
 * PUBLIC_INTERFACE
 * Service to communicate with the backend tasks endpoints.
 * Base URL resolves from DI TASKS_API_BASE -> window.NG_APP_API_BASE -> http://localhost:3001.
 * Endpoints:
 *  - GET    /api/tasks
 *  - POST   /api/tasks
 *  - PUT    /api/tasks/:id
 *  - DELETE /api/tasks/:id
 */
@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private http = inject(HttpClient);
  private baseUrl =
    inject(TASKS_API_BASE, { optional: true }) ??
    readWindowVar('NG_APP_API_BASE') ??
    'http://localhost:3001';

  // PUBLIC_INTERFACE
  /** Fetch all tasks */
  getTasks(): Observable<Task[]> {
    const url = this.join('/api/tasks');
    return this.http.get<Task[]>(url, { withCredentials: true }).pipe(map(arr => Array.isArray(arr) ? arr : []));
  }

  // PUBLIC_INTERFACE
  /** Create a task */
  createTask(task: Partial<Task>): Observable<Task> {
    const url = this.join('/api/tasks');
    return this.http.post<Task>(url, task, { withCredentials: true });
  }

  // PUBLIC_INTERFACE
  /** Update a task by id */
  updateTask(id: string, updates: Partial<Task>): Observable<Task> {
    const url = this.join(`/api/tasks/${encodeURIComponent(id)}`);
    return this.http.put<Task>(url, updates, { withCredentials: true });
  }

  // PUBLIC_INTERFACE
  /** Delete a task by id */
  deleteTask(id: string): Observable<{ success: boolean }> {
    const url = this.join(`/api/tasks/${encodeURIComponent(id)}`);
    return this.http.delete<{ success: boolean }>(url, { withCredentials: true });
  }

  private join(path: string): string {
    return `${this.baseUrl.replace(/\/+$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}

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
