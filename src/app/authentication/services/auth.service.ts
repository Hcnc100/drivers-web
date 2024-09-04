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
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }
  login(LoginDTO: LoginDTO) {
    return this.http.post<LoginResponse>(environment.apiUrl + '/auth/login', LoginDTO).pipe(
      tap((response: LoginResponse) => {
        this.tokenService.setToken(response.token);
      })
    );
  }
}
