import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ✅ FACULTY SIGNUP (returns Observable)
  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/faculty/signup`,
      data
    );
  }

  // ✅ LOGIN
  login(data: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/login`,
      data
    );
  }

  // ✅ SAVE SESSION
  saveSession(token: string): void {
    localStorage.setItem('token', token);

    const payload: any = JSON.parse(atob(token.split('.')[1]));

    localStorage.setItem('role', payload.role);
    localStorage.setItem('approved', String(payload.isApproved));
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ✅ HELPERS
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isApproved(): boolean {
    return localStorage.getItem('approved') === 'true';
  }
}
