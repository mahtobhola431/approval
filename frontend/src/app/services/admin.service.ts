import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getPendingFaculty() {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/faculty/pending`);
  }

  approveFaculty(id: number) {
    return this.http.put(`${environment.apiUrl}/admin/faculty/${id}/approve`, {});
  }

  getUsers() {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/users`);
  }
}
