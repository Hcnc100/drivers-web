import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const canActivateGuardLogin: CanActivateFn = async (route, state) => {
    const tokenServices = inject(TokenService);
    const routerService = inject(Router);
    if (!tokenServices.token) {
        return true;
    } else {
        await routerService.navigate(['/']);
        return false;
    }
}