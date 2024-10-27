import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComponent } from './request.component';
import { ToastService } from '../../shared/toast/toast.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';


describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;
  let toastsServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {

    toastsServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [RequestComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: ToastService, useValue: toastsServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
