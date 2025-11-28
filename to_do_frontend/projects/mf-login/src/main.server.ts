import { bootstrapApplication } from '@angular/platform-browser';
import { LoginRootComponent } from './app/login-root.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/login.routes';

export default function bootstrap() {
  return bootstrapApplication(LoginRootComponent, {
    providers: [provideRouter(routes)]
  });
}
