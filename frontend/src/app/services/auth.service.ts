// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({ providedIn: 'root' })
// export class AuthService {

//   private authReady$ = new BehaviorSubject<boolean>(this.hasToken());

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   // 🔐 LOGIN
//   login(data: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${environment.apiUrl}/auth/login`, data);
//   }

//   // ✅ CALL THIS AFTER LOGIN
//   setSession(res: any): void {
//     localStorage.setItem('token', res.token);
//     localStorage.setItem('role', res.user.role);
//     localStorage.setItem('approved', String(res.user.is_approved));

//     this.authReady$.next(true);
//   }

//   // 🔁 ADMIN / DASHBOARD SHOULD WAIT FOR THIS
//   authReady(): Observable<boolean> {
//     return this.authReady$.asObservable();
//   }

//   logout(): void {
//     localStorage.clear();
//     this.authReady$.next(false);
//     this.router.navigate(['/login']);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  setSession(res: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ✅ LOGIN
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/auth/login`,
      data
    );
  }

  // ✅ FACULTY SIGNUP (THIS WAS MISSING)
  signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/auth/faculty/signup`,
      data
    );
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // helpers (optional)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
