import { inject } from '@angular/core'; 
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);

  // Check if userId exists in local storage
  if (localStorage.getItem('userId') !== null) {
    return true; // Allow access to the route
  } else {
    _router.navigate(['/signIn']); // Redirect to the login page
    return false; // Prevent access to the route
  }
};
