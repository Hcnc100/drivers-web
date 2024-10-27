import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginDTO } from '../model/LoginDTO';
import { LoginResponse } from '../model/LoginResponse';
import { TokenService } from './token.service';

const loginDTO: LoginDTO = {
  email: 'example@mail.com',
  password: 'password'
};
const mockResponse: LoginResponse = {
  token: 'token',
  refreshToken: 'refreshToken',
  user: {
    id: 1,
    name: 'name',
    lastname: 'lastname',
    email: 'email',
    password: 'password',
    birthdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: {
      id: 1,
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
};

const refreshTokenResponse: LoginResponse = {
  token: 'token',
  refreshToken: 'refreshToken',
  user: {
    id: 1,
    name: 'name',
    lastname: 'lastname',
    email: 'email',
    password: 'password',
    birthdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: {
      id: 1,
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
};

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {

    tokenServiceSpy = jasmine.createSpyObj<TokenService>('TokenService', ['tokenData', 'token', 'refreshToken']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login', (done) => {

    service.login(loginDTO).subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);

        expect(tokenServiceSpy.tokenData).toEqual({
          token: refreshTokenResponse.token,
          refreshToken: refreshTokenResponse.refreshToken
        });
        done();
      },
      error: (error) => {
        fail('Expected no errors, but got ' + error);
        done();
      }
    });

    const req = httpClient.expectOne(service.loginPath);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call refreshToken', (done) => {

    service.refreshToken().subscribe({
      next: (res) => {
        expect(res).toEqual(refreshTokenResponse);

        expect(tokenServiceSpy.tokenData).toEqual({
          token: refreshTokenResponse.token,
          refreshToken: refreshTokenResponse.refreshToken
        });

        done();
      },
      error: (error) => {
        fail('Expected no errors, but got ' + error);
        done();
      }
    });

    const req = httpClient.expectOne(service.refreshTokenPath);
    expect(req.request.method).toBe('POST');
    req.flush(refreshTokenResponse);
  });

});