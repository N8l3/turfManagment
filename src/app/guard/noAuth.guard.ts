import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('user'); // Check if user is logged in

  if (isAuthenticated) {
    router.navigate(['/dashboard']); // Redirect to dashboard if already logged in
    return false;
  }
  return true;
};
