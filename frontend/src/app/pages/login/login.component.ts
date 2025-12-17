

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule // ✅ IMPORTANT for routerLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      alert('Email and password are required');
      return;
    }

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        // Save session
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('approved', String(res.user.is_approved));

        // Redirect by role
        const role = res.user.role.toLowerCase();
        this.router.navigate([`/${role}`]);
      },
      error: (err) => {
        alert(err?.error?.message || 'Login failed');
      }
    });
  }
}
