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
  let tokenServiceSpy: TokenService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpTestingController);

    tokenServiceSpy = TestBed.inject(TokenService);
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

        expect(tokenServiceSpy.getAccessToken()).toEqual(
          mockResponse.token
        );

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

        expect(tokenServiceSpy.getAccessToken()).toEqual(
          refreshTokenResponse.token
        );

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


  it('should call verify account', (done) => {

    service.verifyAccount('token').subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);

        done();
      },
      error: (error) => {
        fail('Expected no errors, but got ' + error);
        done();
      }
    });

    const req = httpClient.expectOne(`${service.verifyAccountPath}?token=token`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});