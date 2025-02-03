import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { canActivateGuardLogin } from "./login.guard";
import { TestBed } from "@angular/core/testing";
import { TokenService } from "../services/token.service";
import { constants } from "../../constants/constants";
import { AuthService } from "../services/auth.service";
import { LoginResponse } from "../model/LoginResponse";
import { of } from "rxjs";

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

describe('canActivateGuardLogin', () => {

    let routerServiceMock: jasmine.SpyObj<Router>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let tokenServiceSpy: TokenService;

    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => canActivateGuardLogin(...guardParameters));

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

    afterEach(() => {
        localStorage.clear();
    });



    it('should return false and navigate to home when token exists', async () => {
        const mockRoute = {} as ActivatedRouteSnapshot;
        const mockState = {} as RouterStateSnapshot;


        tokenServiceSpy.setAccessToken('mockToken');
        const result = await executeGuard(mockRoute, mockState);

        expect(result).toBeFalse();
    });

    it('should return true if the refresh token fails', async () => {
        const mockRoute = {} as ActivatedRouteSnapshot;
        const mockState = {} as RouterStateSnapshot;

        authServiceSpy.refreshToken.and.throwError('Error');

        const result = await executeGuard(mockRoute, mockState);

        expect(result).toBeTrue();
    });

    it('should return true if the refresh token return empty', async () => {
        const mockRoute = {} as ActivatedRouteSnapshot;
        const mockState = {} as RouterStateSnapshot;

        authServiceSpy.refreshToken.and.returnValue(of({
            ...loginResponse,
            token: ''
        }));



        const result = await executeGuard(mockRoute, mockState);

        expect(result).toBeTrue();
    });

    it('should return false and navigate to home when token is refreshed', async () => {
        const mockRoute = {} as ActivatedRouteSnapshot;
        const mockState = {} as RouterStateSnapshot;

        authServiceSpy.refreshToken.and.callFake(() => {
            tokenServiceSpy.setAccessToken('newToken');
            return of(loginResponse);
        });

        const result = await executeGuard(mockRoute, mockState);

        expect(result).toBeFalse();
    });
});