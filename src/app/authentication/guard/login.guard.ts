import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const canActivateGuardLogin: CanActivateFn = async (route, state) => {
    const tokenServices = inject(TokenService);
    const routerService = inject(Router);
    const authService = inject(AuthService);

    // Verificar si el access token está en memoria
    const token = tokenServices.getAccessToken();
    if (token) {
        // Si el token existe, redirige al home (ya está logueado)
        await routerService.navigate(['/home']);
        return false;
    }

    // Si no hay access token, intentar hacer el refresh con el refresh token
    try {
        // Llamar a la función que renueva el token
        await firstValueFrom(authService.refreshToken());

        // Después de la renovación, obtener el nuevo access token
        const newToken = tokenServices.getAccessToken();

        console.log('newToken', newToken);

        // Si el refresh fue exitoso y se obtuvo un nuevo token, redirige al home
        if (newToken) {
            await routerService.navigate(['/home']);
            return false;
        }
    } catch (error) {
        return true;
    }

    // Si no se puede renovar el token o no se obtuvo, permite el acceso al login
    return true;
}