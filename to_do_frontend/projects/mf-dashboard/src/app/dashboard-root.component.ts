import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Root component for the mf-dashboard remote.
 */
@Component({
  selector: 'dashboard-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class DashboardRootComponent {}
