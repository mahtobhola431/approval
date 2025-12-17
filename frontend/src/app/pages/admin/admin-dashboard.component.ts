
// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AdminService } from '../../services/admin.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css']
// })
// export class AdminDashboardComponent implements OnInit, AfterViewInit {

//   pendingFaculty: any[] = [];
//   users: any[] = [];
//   loadingPending = false;
//   loadingUsers = false;

//   constructor(
//     private adminService: AdminService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // DO NOTHING HERE
//   }

//   ngAfterViewInit(): void {
//     // ✅ Load AFTER auth + interceptor are ready
//     setTimeout(() => {
//       this.loadPendingFaculty();
//       this.loadUsers();
//     });
//   }

//   loadPendingFaculty(): void {
//     this.loadingPending = true;

//     this.adminService.getPendingFaculty().subscribe({
//       next: (res) => {
//         this.pendingFaculty = res || [];
//         this.loadingPending = false;
//       },
//       error: (err) => {
//         console.error('Pending faculty error', err);
//         this.loadingPending = false;
//       }
//     });
//   }

//   loadUsers(): void {
//     this.loadingUsers = true;

//     this.adminService.getUsers().subscribe({
//       next: (res) => {
//         this.users = res || [];
//         this.loadingUsers = false;
//       },
//       error: (err) => {
//         console.error('Users error', err);
//         this.loadingUsers = false;
//       }
//     });
//   }

//   approveFaculty(id: number): void {
//     if (!confirm('Approve this faculty?')) return;

//     this.adminService.approveFaculty(id).subscribe({
//       next: () => {
//         alert('Faculty approved');
//         this.loadPendingFaculty();
//         this.loadUsers();
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Approval failed');
//       }
//     });
//   }

//   logout(): void {
//     this.authService.logout();
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AdminService } from '../../services/admin.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css']
// })
// export class AdminDashboardComponent implements OnInit {

//   pendingFaculty: any[] = [];
//   users: any[] = [];
//   loadingPending = false;
//   loadingUsers = false;

//   constructor(
//     private adminService: AdminService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       // 🚨 not authenticated
//       this.router.navigate(['/login']);
//       return;
//     }

//     // ✅ token exists → safe to load data
//     this.loadPendingFaculty();
//     this.loadUsers();
//   }

//   loadPendingFaculty(): void {
//     this.loadingPending = true;

//     this.adminService.getPendingFaculty().subscribe({
//       next: (res) => {
//         this.pendingFaculty = res || [];
//         this.loadingPending = false;
//       },
//       error: (err) => {
//         console.error('Pending faculty error', err);
//         this.loadingPending = false;
//       }
//     });
//   }

//   loadUsers(): void {
//     this.loadingUsers = true;

//     this.adminService.getUsers().subscribe({
//       next: (res) => {
//         this.users = res || [];
//         this.loadingUsers = false;
//       },
//       error: (err) => {
//         console.error('Users error', err);
//         this.loadingUsers = false;
//       }
//     });
//   }

//   approveFaculty(id: number): void {
//     if (!confirm('Approve this faculty?')) return;

//     this.adminService.approveFaculty(id).subscribe({
//       next: () => {
//         alert('Faculty approved');
//         this.loadPendingFaculty();
//         this.loadUsers();
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Approval failed');
//       }
//     });
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }



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
    // ✅ JUST LOAD DATA
    this.loadPendingFaculty();
    this.loadUsers();
  }

  loadPendingFaculty(): void {
    this.loadingPending = true;

    this.adminService.getPendingFaculty().subscribe({
      next: (res) => {
        this.pendingFaculty = res || [];
        this.loadingPending = false;
      },
      error: (err) => {
        console.error('Pending faculty error', err);
        this.loadingPending = false;
      }
    });
  }

  loadUsers(): void {
    this.loadingUsers = true;

    this.adminService.getUsers().subscribe({
      next: (res) => {
        this.users = res || [];
        this.loadingUsers = false;
      },
      error: (err) => {
        console.error('Users error', err);
        this.loadingUsers = false;
      }
    });
  }

  approveFaculty(id: number): void {
    if (!confirm('Approve this faculty?')) return;

    this.adminService.approveFaculty(id).subscribe({
      next: () => {
        alert('Faculty approved');
        this.loadPendingFaculty();
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
        alert('Approval failed');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
