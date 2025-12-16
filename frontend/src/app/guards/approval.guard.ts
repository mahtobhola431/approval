import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const approvalGuard: CanActivateFn = () => {
  const router = inject(Router);
  const approved = localStorage.getItem('approved');

  if (approved !== '1') {
    alert('Approval pending');
    router.navigate(['/']);
    return false;
  }

  return true;
};
