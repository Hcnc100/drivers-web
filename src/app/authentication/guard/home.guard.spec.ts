import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { canActivateGuardHome } from './home.guard';
import { TokenService } from '../services/token.service';
import { constants } from '../../constants/constants';


describe('canActivateGuardHome', () => {

  let routerServiceMock: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canActivateGuardHome(...guardParameters));

  beforeEach(() => {
    routerServiceMock = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        TokenService,

        { provide: Router, useValue: routerServiceMock },
      ],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return true if token is present', async () => {
    localStorage.setItem(constants.KEY_TOKEN, 'mockToken');

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBeTrue();
    expect(routerServiceMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /login if token is not present', async () => {
    localStorage.removeItem(constants.KEY_TOKEN);

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBeFalse();
    expect(routerServiceMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});