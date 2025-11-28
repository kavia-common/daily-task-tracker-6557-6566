import { Routes } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Application routes for host app-shell.
 * Only '/login' is available and it loads the 'mf-login' remote via Module Federation.
 * Default route redirects to '/login'.
 */
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./remote-entry.routes').then((m) => m.MF_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
