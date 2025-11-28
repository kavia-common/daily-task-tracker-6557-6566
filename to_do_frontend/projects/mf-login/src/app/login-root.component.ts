import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Root component for the mf-login remote.
 */
@Component({
  selector: 'login-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class LoginRootComponent {}
