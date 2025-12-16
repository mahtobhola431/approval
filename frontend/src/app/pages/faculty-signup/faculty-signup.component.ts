import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-faculty-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty-signup.component.html',
  styleUrls: ['./faculty-signup.component.css']
})
export class FacultySignupComponent {

  name: string = '';
  email: string = '';
  password: string = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup(): void {
    this.errorMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;

    this.authService.signup({
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password
    }).subscribe({
      next: () => {
        alert('Signup successful. Await admin approval.');
        this.router.navigate(['/login']);
      },
      error: (er:any) => {
        console.error('Signup error', er);
        this.errorMessage =
          er?.error?.message || 'Signup failed. Try again.';
        this.loading = false;
      }
    });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
