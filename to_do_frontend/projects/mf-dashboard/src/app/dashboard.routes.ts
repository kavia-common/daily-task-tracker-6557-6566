import { Routes } from '@angular/router';
import { DashboardShellComponent } from './dashboard/shell/dashboard-shell.component';

/**
 * PUBLIC_INTERFACE
 * Routes inside the mf-dashboard remote. Default path renders the dashboard shell.
 */
export const routes: Routes = [
  { path: '', component: DashboardShellComponent }
];
