import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAccountComponent } from './verify-account.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('VerifyAccountComponent', () => {
  let component: VerifyAccountComponent;
  let fixture: ComponentFixture<VerifyAccountComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const activatedRouteMock = {
    queryParams: of({ token: 'mock-token' }), // Mock de los parámetros de la URL
  };

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['verifyAccount']);

    await TestBed.configureTestingModule({
      imports: [VerifyAccountComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VerifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
