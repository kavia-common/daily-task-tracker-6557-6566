import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * LoginComponent renders the login form per design notes using Angular Material.
 */
@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  hide = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Hook for future auth integration
    const { email, password } = this.form.value;
    console.log('Login submit', { email, password });
  }
}
