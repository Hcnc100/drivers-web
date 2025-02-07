import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDTO } from '../model/LoginDTO';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { LoginResponse } from '../model/LoginResponse';
import { environment } from '../../../environments/environment';
import { ResetPasswordDTO } from '../model/ResetPasswordDTO';
import { SendForgotPassordDto } from '../model/SendForgotPassordDto';
import { SendForgotPasswordResponse } from '../model/SendForgotPasswordResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly tokenService: TokenService = inject(TokenService);
  private readonly controller = environment.apiUrl + environment.apiVersion + '/auth';

  readonly loginPath = `${this.controller}/login`;
  readonly refreshTokenPath = `${this.controller}/refresh`;
  readonly verifyAccountPath = `${this.controller}/verify`;
  readonly resetPasswordPath = `${this.controller}/reset-password`;
  readonly sendResetPasswordPath = `${this.controller}/forgot-password`;


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
    return this.http.get(`${this.verifyAccountPath}?${queryParams.toString()}`);
  }

  resetPassword(
    resetPasswordDTO: ResetPasswordDTO
  ) {
    return this.http.post(`${this.resetPasswordPath}`, resetPasswordDTO);
  }

  sendResetPassword(sendForgotPassordDto: SendForgotPassordDto) {
    return this.http.post<SendForgotPasswordResponse>(`${this.sendResetPasswordPath}`, sendForgotPassordDto);
  }
}
