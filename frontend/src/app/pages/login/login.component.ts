import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
   
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('approved', String(res.user.is_approved));


        const role = res.user.role.toLowerCase();
        this.router.navigate([`/${role}`]);
      },
      error: (err) => {
        alert(`Login failed: ${err.error.message}`);
      }
    });
  }
}
