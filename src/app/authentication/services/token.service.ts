import { Injectable } from '@angular/core';
import { constants } from '../../constants/constants';
import { TokenData } from '../model/TokenData';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  get token(): string {
    return localStorage.getItem(constants.KEY_TOKEN) ?? '';
  }

  get refreshToken(): string {
    return localStorage.getItem(constants.KEY_REFRESH_TOKEN) ?? '';
  }

  get tokenData(): TokenData {
    return {
      token: this.token,
      refreshToken: this.refreshToken
    };
  }

  set tokenData(tokenData: TokenData) {
    localStorage.setItem(constants.KEY_TOKEN, tokenData.token);
    localStorage.setItem(constants.KEY_REFRESH_TOKEN, tokenData.refreshToken);
  }

  deleteToken() {
    localStorage.removeItem(constants.KEY_TOKEN);
    localStorage.removeItem(constants.KEY_REFRESH_TOKEN);
  }

}
