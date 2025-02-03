import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { first, firstValueFrom } from 'rxjs';


export const canActivateGuardHome: CanActivateFn = async (route, state) => {
  const tokenServices = inject(TokenService);
  const routerService = inject(Router);
  const authService = inject(AuthService);

  // Verificar si el access token está en memoria
  const token = tokenServices.getAccessToken();
  if (token) {
    // Si el token existe y es válido, permite el acceso
    return true;
  }

  // Si no hay access token, intenta hacer el refresh con el refresh token
  try {
    // Llamar a la función que renueva el token
    await firstValueFrom(authService.refreshToken());

    // Después de la renovación, obtener el nuevo access token
    const newToken = tokenServices.getAccessToken();

    // Si el refresh fue exitoso y se obtuvo un nuevo token, permite el acceso
    if (newToken) {
      return true;
    }
  } catch (error) {
    // Si hubo un error en la renovación, redirigir al login
    console.error('Error al renovar el token', error);
  }

  // Si no se puede renovar el token o no se obtuvo, redirige al login
  await routerService.navigate(['/login']);
  return false;
};



