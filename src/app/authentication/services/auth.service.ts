import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginDTO } from '../model/LoginDTO';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { LoginResponse } from '../model/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly controller = environment.apiUrl + environment.apiVersion + '/auth';
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }
  login(LoginDTO: LoginDTO) {
    return this.http.post<LoginResponse>(`${this.controller}/login`, LoginDTO).pipe(
      tap((response: LoginResponse) => {
        const tokenData = {
          token: response.token,
          refreshToken: response.refreshToken
        };
        this.tokenService.tokenData = tokenData;
      })
    );
  }

  refreshToken() {
    const tokenData = this.tokenService.tokenData;
    return this.http.post<LoginResponse>(`${this.controller}/refresh`, tokenData).pipe(
      tap((response: LoginResponse) => {
        const tokenData = {
          token: response.token,
          refreshToken: response.refreshToken
        };
        this.tokenService.tokenData = tokenData;
      })
    );
  }
}
