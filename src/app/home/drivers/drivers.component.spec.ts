import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversComponent } from './drivers.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastService } from '../../shared/toast/toast.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DriversService } from './services/drivers.service';
import { PaginatedResult } from '../../shared/pagination/model/pagination.result';
import { Driver } from './model/driver.types';
import { of, throwError } from 'rxjs';


const paginationResponseDriver: PaginatedResult<Driver> = {
  pagination: {
    currentPage: 1,
    totalItems: 100,
    totalPages: 10,
    pageSize: 10
  },
  result: []
};

const driver: Driver = {
  id: 1,
  name: 'name',
  lastname: 'lastname',
  email: 'email',
  phone: 'phone',
  imageProfile: 'imageProfile',
  birthdate: new Date().toISOString(),
};


describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;
  let toastsServiceSpy: jasmine.SpyObj<ToastService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let driversServiceSpy: jasmine.SpyObj<DriversService>;

  beforeEach(async () => {
    toastsServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    driversServiceSpy = jasmine.createSpyObj<DriversService>('DriversService', ['createDriver', 'updateDriver', 'deleteDriver', 'getAllPaginated']);

    await TestBed.configureTestingModule({
      imports: [DriversComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: toastsServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: DriversService, useValue: driversServiceSpy }
      ]
    })
      .compileComponents();

    driversServiceSpy.getAllPaginated.and.returnValue(of(paginationResponseDriver));
    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit driver with null response (cancel response)', () => {

    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of(null),
      close: null
    });

    dialogSpy.open.and.returnValue(dialogRefSpy);

    component.paginationActions[0].action(driver);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should edit driver update success', () => {

    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of(driver),
      close: null
    });

    dialogSpy.open.and.returnValue(dialogRefSpy);
    driversServiceSpy.updateDriver.and.returnValue(of(driver));

    component.paginationActions[0].action(driver);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(toastsServiceSpy.showSuccess).toHaveBeenCalledWith(
      'Conductor actualizado',
      'Se ha actualizado el conductor'
    )
  });

  it('should edit driver update error', () => {

    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of(driver),
      close: null
    });

    dialogSpy.open.and.returnValue(dialogRefSpy);
    driversServiceSpy.updateDriver.and.returnValue(throwError(() => new Error('error')));

    component.paginationActions[0].action(driver);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(toastsServiceSpy.showError).toHaveBeenCalledWith(
      'Error',
      'No se ha podido actualizar el conductor'
    )
  });


  it('should create driver and success response', () => {

    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of(driver),
      close: null
    });

    dialogSpy.open.and.returnValue(dialogRefSpy);
    driversServiceSpy.createDriver.and.returnValue(of(driver));

    component.generalActions[0].action();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(toastsServiceSpy.showSuccess).toHaveBeenCalledWith(
      'Conductor creado',
      'Se ha creado un nuevo conductor'
    )
  });

  it('should create driver and error response', () => {

    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of(driver),
      close: null
    });

    dialogSpy.open.and.returnValue(dialogRefSpy);
    driversServiceSpy.createDriver.and.returnValue(throwError(() => new Error('error')));

    component.generalActions[0].action();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(toastsServiceSpy.showError).toHaveBeenCalledWith(
      'Error',
      'No se ha podido crear el conductor'
    )
  });

  it('should delete driver and success response', () => {

    driversServiceSpy.deleteDriver.and.returnValue(of(driver));

    component.paginationActions[1].action(driver);
    expect(toastsServiceSpy.showSuccess).toHaveBeenCalledWith(
      'Conductor eliminado',
      'Se ha eliminado el conductor'
    )
  });

  it('should delete driver and error response', () => {

    driversServiceSpy.deleteDriver.and.returnValue(throwError(() => new Error('error')));

    component.paginationActions[1].action(driver);
    expect(toastsServiceSpy.showError).toHaveBeenCalledWith(
      'Error',
      'No se ha podido eliminar el conductor'
    )
  });

  it('should see the drivers', () => {

    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of(null),
      close: null
    });

    dialogSpy.open.and.returnValue(dialogRefSpy);
    component.paginationActions[2].action(driver);
    expect(dialogSpy.open).toHaveBeenCalled();

  });


});
