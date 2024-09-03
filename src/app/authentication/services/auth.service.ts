import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginDTO } from '../model/LoginDTO';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }
  login(LoginDTO: LoginDTO) {
    return this.http.post(environment.apiUrl + '/auth/login', LoginDTO);
  }
}
