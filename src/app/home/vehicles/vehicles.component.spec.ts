import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesComponent } from './vehicles.component';
import { VehiclesService } from './services/services/vehicles.service';
import { ToastService } from '../../shared/toast/toast.service';
import { PaginatedResult } from '../../shared/pagination/model/pagination.result';
import { Vehicle } from './model/vehicle';
import { of, Subject } from 'rxjs';
import { signal } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';


const paginatedResultMock: PaginatedResult<Vehicle> = {
  result: [
    {
      id: 1,
      model: 'Corolla',
      plates: 'ABC123',
      make: 'Toyota',
      color: 'Red',
      isRotulated: true,
      number: 1
    }
  ],
  pagination: {
    currentPage: 1,
    pageSize: 1,
    totalItems: 1,
    totalPages: 1
  }
};


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
        provideNoopAnimations(),
        { provide: VehiclesService, useValue: vehicleService },
        { provide: ToastService, useValue: toastsServiceSpy },]
    })
      .compileComponents();

    vehicleService.getAllPaginated.and.returnValue(of(paginatedResultMock));


    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
