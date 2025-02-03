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

  it('should get access token empty', () => {
    expect(service.getAccessToken()).toBe('');
  });

  it('should set access token', () => {
    service.setAccessToken("token");
    expect(service.getAccessToken()).toBe("token");
  });
});
