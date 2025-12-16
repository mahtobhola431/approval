import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FacultyService {
  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<any[]>(`${environment.apiUrl}/faculty/students`);
  }

  addStudent(data: any) {
    return this.http.post(`${environment.apiUrl}/faculty/students`, data);
  }
}
