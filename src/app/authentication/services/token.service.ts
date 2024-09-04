import { Injectable } from '@angular/core';
import { constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(constants.KEY_TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(constants.KEY_TOKEN);
  }
}
