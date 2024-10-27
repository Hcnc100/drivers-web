import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversComponent } from './drivers.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastService } from '../../shared/toast/toast.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;
  let toastsServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    toastsServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [DriversComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: toastsServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
