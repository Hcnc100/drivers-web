import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesComponent } from './vehicles.component';
import { VehiclesService } from './services/services/vehicles.service';
import { ToastService } from '../../shared/toast/toast.service';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;
  let vehicleService: jasmine.SpyObj<VehiclesService>;
  let toastsServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    vehicleService = jasmine.createSpyObj<VehiclesService>('VehiclesService', ['getAllPaginated', 'notifyChange']);
    toastsServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [VehiclesComponent],
      providers: [
        { provide: VehiclesService, useValue: vehicleService },
        { provide: ToastService, useValue: toastsServiceSpy },]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
