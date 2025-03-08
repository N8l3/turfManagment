import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router(); // Inject Router manually
  const isAuthenticated = !!localStorage.getItem('user'); // Check if user is logged in

  if (!isAuthenticated) {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }
  return true;
};
