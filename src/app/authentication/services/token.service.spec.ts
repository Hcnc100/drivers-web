import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { constants } from '../../constants/constants';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token', () => {
    const token = 'token';
    localStorage.setItem(constants.KEY_TOKEN, token);
    expect(service.token).toEqual(token);
  });

  it('should get token empty', () => {
    expect(service.token).toEqual('');
  });

  it('should get refresh token', () => {
    const refreshToken = 'refresh_token';
    localStorage.setItem(constants.KEY_REFRESH_TOKEN, refreshToken);
    expect(service.refreshToken).toEqual(refreshToken);
  });
  it('should get refresh token empty', () => {
    expect(service.refreshToken).toEqual('');
  });

  it('should get token data', () => {
    const token = 'token';
    const refreshToken = 'refresh_token';
    localStorage.setItem(constants.KEY_TOKEN, token);
    localStorage.setItem(constants.KEY_REFRESH_TOKEN, refreshToken);

    const tokenData = service.tokenData;
    expect(tokenData.token).toEqual(token);
    expect(tokenData.refreshToken).toEqual(refreshToken);
  });

  it('should set token data', () => {
    const token = 'token';
    const refreshToken = 'refresh_token';
    service.tokenData = {
      token,
      refreshToken
    };

    expect(localStorage.getItem(constants.KEY_TOKEN)).toEqual(token);
    expect(localStorage.getItem(constants.KEY_REFRESH_TOKEN)).toEqual(refreshToken);
  });

  it('should delete token', () => {
    const token = 'token';
    const refreshToken = 'refresh_token';

    localStorage.setItem(constants.KEY_TOKEN, token);
    localStorage.setItem(constants.KEY_REFRESH_TOKEN, refreshToken);

    service.deleteToken();

    expect(localStorage.getItem(constants.KEY_TOKEN)).toBeFalsy();
    expect(localStorage.getItem(constants.KEY_REFRESH_TOKEN)).toBeFalsy();
  });
});
