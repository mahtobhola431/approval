import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  pendingFaculty: any[] = [];
  users: any[] = [];
  loadingPending = false;
  loadingUsers = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPendingFaculty();
    this.loadUsers();
  }

  loadPendingFaculty(): void {
    this.loadingPending = true;

    this.adminService.getPendingFaculty().subscribe({
      next: (res: any) => {
        this.pendingFaculty = res?.data || res || [];
        this.loadingPending = false;
      },
      error: (err) => {
        console.error('Error loading pending faculty', err);
        this.pendingFaculty = [];
        this.loadingPending = false;
      }
    });
  }

  loadUsers(): void {
    this.loadingUsers = true;

    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res?.data || res || [];
        this.loadingUsers = false;
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.users = [];
        this.loadingUsers = false;
      }
    });
  }

  approveFaculty(id: number): void {
    if (!confirm('Are you sure you want to approve this faculty?')) {
      return;
    }

    this.adminService.approveFaculty(id).subscribe({
      next: () => {
        alert('Faculty approved successfully');
        this.loadPendingFaculty();
        this.loadUsers();
      },
      error: (err) => {
        console.error('Approval failed', err);
        alert('Failed to approve faculty');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
