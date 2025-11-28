import { Routes } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Routes exposed by the mf-login remote. Host uses these with loadChildren
 * and Module Federation to render the LoginModule at /login.
 *
 * Note: In host, we reference the remote by its exposed module path.
 */
export const MF_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('mf-login/LoginModule').then((m: any) => m.LoginModule),
  }
];
