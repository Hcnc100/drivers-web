import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { VehicleFormComponent } from './vehicle-form.component';
import { VehiclesService } from '../../services/services/vehicles.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Color } from '../../model/Color';
import { Model } from '../../model/model';
import { Make } from '../../model/make';
import { of } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DialogData } from '../../../drivers/model/dialog.data';
import { Vehicle } from '../../model/vehicle';
import { DialogAction } from '../../../../shared/model/Dialog.action';
import { PaginatedResult } from '../../../../shared/pagination/model/pagination.result';

const color: Color[] = [
  {
    id: 1,
    color: 'Red',
    hex: '#FF0000'
  },
  {
    id: 2,
    color: 'Green',
    hex: '#00FF00'
  }
];

const models: Model[] = [
  {
    id: 1,
    model: 'Model 1'
  },
  {
    id: 2,
    model: 'Model 2'
  }
];

const makes: Make[] = [
  {
    id: 1,
    make: 'Make 1'
  },
  {
    id: 2,
    make: 'Make 2'
  }
];

const dialogData: DialogData<Vehicle> = {
  data: {
    id: 1,
    number: 123,
    isRotulated: false,
    make: 'Make 1',
    model: 'Model 1',
    color: 'Red',
    plates: '123'
  },
  action: DialogAction.OBSERVE
}

const vehicleResponse: PaginatedResult<Vehicle> = {
  result: [],
  pagination: {
    currentPage: 1,
    pageSize: 1,
    totalItems: 1,
    totalPages: 1
  }
}

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let vehiclesService: jasmine.SpyObj<VehiclesService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<VehicleFormComponent>>;

  beforeEach(async () => {

    vehiclesService = jasmine.createSpyObj<VehiclesService>('VehiclesService', ['getAllPaginated', 'notifyChange', 'getListMake', 'getListModel', 'getListColor', 'create']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<VehicleFormComponent>>('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [VehicleFormComponent],
      providers: [
        provideNoopAnimations(),
        { provide: VehiclesService, useValue: vehiclesService },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();

    vehiclesService.getAllPaginated.and.returnValue(of(vehicleResponse));
    vehiclesService.getListColor.and.returnValue(of(color));
    vehiclesService.getListModel.and.returnValue(of(models));
    vehiclesService.getListMake.and.returnValue(of(makes));

    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request makes when make control changes', fakeAsync(() => {
    component.ngOnInit();
    component.vehicleForm.controls.make.setValue('Make 1', { emitEvent: true });
    tick(500);
    expect(vehiclesService.getListMake).toHaveBeenCalledWith({ page: 1, limit: 3, search: 'Make 1' });
  }));

  it('should request models when model control changes with make value', fakeAsync(() => {
    component.ngOnInit();
    component.vehicleForm.controls.model.setValue('Model 1', { emitEvent: true });
    component.vehicleForm.controls.make.setValue('Make 1', { emitEvent: true });
    tick(500);
    expect(vehiclesService.getListModel).toHaveBeenCalledWith('Make 1', { page: 1, limit: 3, search: 'Model 1' });
  }));

  it('should not request models when model control changes without make value', fakeAsync(() => {
    component.ngOnInit();
    component.vehicleForm.controls.model.setValue('Model 1', { emitEvent: true });
    tick(500);
    expect(vehiclesService.getListModel).toHaveBeenCalledWith('', { page: 1, limit: 3, search: 'Model 1' });
  }));

  it('should save vehicle when form is valid', () => {
    component.vehicleForm.setValue({
      make: 'Make 1',
      model: 'Model 1',
      color: 'Red',
      number: 123,
      plates: '123',
      isRotulated: false
    });
    component.save();
    expect(dialogRefSpy.close).toHaveBeenCalled();

  });

});



describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let vehiclesService: jasmine.SpyObj<VehiclesService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<VehicleFormComponent>>;

  beforeEach(async () => {

    vehiclesService = jasmine.createSpyObj<VehiclesService>('VehiclesService', ['getAllPaginated', 'notifyChangeSignal', 'getListMake', 'getListModel', 'getListColor', 'create']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<VehicleFormComponent>>('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [VehicleFormComponent],
      providers: [
        provideNoopAnimations(),
        { provide: VehiclesService, useValue: vehiclesService },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    })
      .compileComponents();

    vehiclesService.getAllPaginated.and.returnValue(of(vehicleResponse));
    vehiclesService.getListColor.and.returnValue(of(color));
    vehiclesService.getListModel.and.returnValue(of(models));
    vehiclesService.getListMake.and.returnValue(of(makes));

    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with form disable', () => {

    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.vehicleForm.disabled).toBeTrue();
  });

});