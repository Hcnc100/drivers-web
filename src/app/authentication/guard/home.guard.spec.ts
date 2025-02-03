import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { canActivateGuardHome } from './home.guard';
import { TokenService } from '../services/token.service';
import { constants } from '../../constants/constants';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { LoginResponse } from '../model/LoginResponse';


const loginResponse: LoginResponse = {
  token: 'mockToken',
  refreshToken: 'mockRefreshToken',
  user: {
    id: 1,
    name: 'mockName',
    lastname: 'mockLastName',
    email: 'mockEmail',
    password: 'mockPassword',
    birthdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: {
      id: 1,
      description: 'mockDescription',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }
};


describe('canActivateGuardHome', () => {

  let routerServiceMock: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let tokenServiceSpy: TokenService;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canActivateGuardHome(...guardParameters));

  beforeEach(() => {
    routerServiceMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['refreshToken']);

    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: Router, useValue: routerServiceMock },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    tokenServiceSpy = TestBed.inject(TokenService);
  });



  it('should return true if token exists', async () => {
    const mockRoute = {} as any;
    const mockState = {} as any;


    tokenServiceSpy.setAccessToken('mockToken');
    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBeTrue();
    expect(routerServiceMock.navigate).not.toHaveBeenCalled();  // No navigation should occur
  });

  it('should return true if the refresh token succeeds', async () => {
    const mockRoute = {} as any;
    const mockState = {} as any;

    authServiceSpy.refreshToken.and.callFake(() => {
      tokenServiceSpy.setAccessToken('newToken');
      return of(loginResponse);
    });

    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBeTrue();
    expect(routerServiceMock.navigate).not.toHaveBeenCalled();  // No navigation should occur
  });

  it('should return false and navigate to login if refresh token fails', async () => {
    const mockRoute = {} as any;
    const mockState = {} as any;

    authServiceSpy.refreshToken.and.throwError('Error');

    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBeFalse();
    expect(routerServiceMock.navigate).toHaveBeenCalledWith(['/login']);  // Should navigate to login
  });

  it('should return true if new token exists after refresh', async () => {
    const mockRoute = {} as any;
    const mockState = {} as any;

    authServiceSpy.refreshToken.and.returnValue(of(loginResponse));
    tokenServiceSpy.setAccessToken('newToken');

    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBeTrue();
    expect(routerServiceMock.navigate).not.toHaveBeenCalled();
  });
});