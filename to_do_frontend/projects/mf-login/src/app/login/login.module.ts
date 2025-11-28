import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login.component';
import { LOGIN_API_BASE } from './login-api.service';

/**
 * PUBLIC_INTERFACE
 * LoginModule exposed via Module Federation as './LoginModule'.
 * Declares and exports the LoginComponent.
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    {
      provide: LOGIN_API_BASE,
      useFactory: () => {
        try {
          // Access window via globalThis to satisfy SSR and linter
          // eslint-disable-next-line no-undef
          const w = (globalThis as any)?.window as any | undefined;
          return (w && w.NG_APP_API_BASE) || '';
        } catch {
          return '';
        }
      }
    }
  ]
})
export class LoginModule {}
