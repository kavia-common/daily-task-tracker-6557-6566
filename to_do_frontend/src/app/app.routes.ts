import { Routes } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Application routes for host app-shell. The '/login' route loads the
 * 'mf-login' remote via Module Federation using its exposed LoginModule.
 */
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./remote-entry.routes').then((m) => m.MF_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
