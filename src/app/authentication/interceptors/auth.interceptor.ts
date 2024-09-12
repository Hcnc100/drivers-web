import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { TokenService } from "../services/token.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const tokenServices = inject(TokenService);
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = tokenServices.token;

    req = signingRequestInterceptor(req, token);

    return next(req).pipe(
        catchError((error) => {
            const refreshToken = tokenServices.refreshToken;
            if (error.status === 401 && token && refreshToken && (!req.url.includes('refresh') || !req.url.includes('login'))) {
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        req = signingRequestInterceptor(req, tokenServices.token);
                        return next(req);
                    }),
                    catchError((refreshError) => {
                        tokenServices.deleteToken();
                        router.navigate(['/login']);
                        return throwError(() => refreshError);
                    })
                );
            }
            return throwError(() => error);
        })
    );
}


const signingRequestInterceptor = (req: HttpRequest<any>, accessToken: string) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}