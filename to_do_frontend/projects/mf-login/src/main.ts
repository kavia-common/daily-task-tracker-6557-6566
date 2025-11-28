import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/login.routes';
import { LoginRootComponent } from './app/login-root.component';

bootstrapApplication(LoginRootComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
