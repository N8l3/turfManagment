import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Correct way to inject Router
  const isAuthenticated = !!localStorage.getItem('user'); // Check if user is logged in

  if (!isAuthenticated) {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }
  return true;
};
