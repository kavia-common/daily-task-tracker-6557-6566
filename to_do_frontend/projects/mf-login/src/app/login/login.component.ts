import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginApiService } from './login-api.service';

/**
 * PUBLIC_INTERFACE
 * LoginComponent renders the login form per design notes using Angular Material.
 * - Validates email and password.
 * - Supports remember me.
 * - Shows loading spinner and error area.
 */
@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  hide = true;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private fb: FormBuilder, private api: LoginApiService) {}

  // PUBLIC_INTERFACE
  /** Submit the login form (validates, shows loading state, and handles error/success). */
  submit(): void {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password, remember } = this.form.value;
    this.isLoading.set(true);
    this.api.login({ email: email!, password: password!, remember: !!remember }).subscribe({
      next: (resp) => {
        this.isLoading.set(false);
        if (!resp.success) {
          this.errorMessage.set(resp.message || 'Login failed.');
          return;
        }
        // Successful login (simulated). In step 2.3 we will route and store token or cookies as needed.
        console.log('Login success', resp);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = (err && (err.message || err.error?.message)) || 'Unable to login.';
        this.errorMessage.set(msg);
      }
    });
  }

  // PUBLIC_INTERFACE
  /** Convenience getters for validation display. */
  get emailCtrl() { return this.form.get('email'); }
  get passwordCtrl() { return this.form.get('password'); }
}
