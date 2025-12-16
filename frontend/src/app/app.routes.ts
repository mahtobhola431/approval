import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { FacultySignupComponent } from './pages/faculty-signup/faculty-signup.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';
import { FacultyDashboardComponent } from './pages/faculty/faculty-dashboard.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard.component';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { approvalGuard } from './guards/approval.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'faculty-signup', component: FacultySignupComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'faculty',
    component: FacultyDashboardComponent,
    canActivate: [authGuard, roleGuard, approvalGuard],
    data: { role: 'FACULTY' }
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'STUDENT' }
  }
];
