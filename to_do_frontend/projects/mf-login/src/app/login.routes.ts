import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

/**
 * PUBLIC_INTERFACE
 * Routes inside the mf-login remote. The default path renders LoginComponent.
 */
export const routes: Routes = [
  { path: '', component: LoginComponent }
];
