import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDTO } from '../model/LoginDTO';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { LoginResponse } from '../model/LoginResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly tokenService: TokenService = inject(TokenService);
  private readonly controller = environment.apiUrl + environment.apiVersion + '/auth';

  readonly loginPath = `${this.controller}/login`;
  readonly refreshTokenPath = `${this.controller}/refresh`;


  login(LoginDTO: LoginDTO) {
    return this.http.post<LoginResponse>(this.loginPath, LoginDTO).pipe(
      tap((response: LoginResponse) => {
        this.tokenService.setAccessToken(response.token);
      })
    );
  }

  refreshToken() {
    return this.http.post<LoginResponse>(this.refreshTokenPath, null).pipe(
      tap((response: LoginResponse) => {
        this.tokenService.setAccessToken(response.token);
      })
    );
  }

  verifyAccount(token: string) {
    const queryParams = new URLSearchParams();
    queryParams.set('token', token);
    return this.http.get(`${this.controller}/verify?${queryParams.toString()}`);
  }
}
