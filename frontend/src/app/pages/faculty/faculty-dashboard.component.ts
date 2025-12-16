import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyService } from '../../services/faculty.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css']
})
export class FacultyDashboardComponent implements OnInit {

  // student form
  name: string = '';
  email: string = '';
  password: string = '';

  students: any[] = [];

  loadingStudents = false;
  addingStudent = false;
  errorMessage = '';

  constructor(
    private facultyService: FacultyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loadingStudents = true;

    this.facultyService.getStudents().subscribe({
      next: (res: any) => {
        this.students = res?.data || res || [];
        this.loadingStudents = false;
      },
      error: (err) => {
        console.error('Error loading students', err);
        this.students = [];
        this.loadingStudents = false;
      }
    });
  }

  addStudent(): void {
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

    this.addingStudent = true;

    this.facultyService.addStudent({
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password
    }).subscribe({
      next: () => {
        alert('Student added successfully');
        this.resetForm();
        this.loadStudents();
        this.addingStudent = false;
      },
      error: (err) => {
        console.error('Add student failed', err);
        this.errorMessage =
          err?.error?.message || 'Failed to add student';
        this.addingStudent = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
