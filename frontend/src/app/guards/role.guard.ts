import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (!role || role !== route.data['role']) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
