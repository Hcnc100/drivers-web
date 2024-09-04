import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const tokenServices = inject(TokenService);
  const routerService = inject(Router);
  if (tokenServices.getToken()) {
    return true;
  } else {
    routerService.navigate(['/login']);
    return false;
  }
};
