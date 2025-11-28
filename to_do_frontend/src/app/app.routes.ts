import { Routes } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Application routes for host app-shell. The '/login' route loads the
 * 'mf-login' remote at runtime via a dynamic remote loader to avoid build-time resolution.
 */
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login-remote.routes').then((m) => m.routes)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
