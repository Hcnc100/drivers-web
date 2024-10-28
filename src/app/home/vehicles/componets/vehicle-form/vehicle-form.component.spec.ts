import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormComponent } from './vehicle-form.component';
import { VehiclesService } from '../../services/services/vehicles.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Color } from '../../model/Color';
import { Model } from '../../model/model';
import { Make } from '../../model/make';
import { of } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

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

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let vehiclesService: jasmine.SpyObj<VehiclesService>;

  beforeEach(async () => {

    vehiclesService = jasmine.createSpyObj<VehiclesService>('VehiclesService', ['getAllPaginated', 'notifyChange', 'getListMake', 'getListModel', 'getListColor', 'create']);

    await TestBed.configureTestingModule({
      imports: [VehicleFormComponent],
      providers: [
        provideNoopAnimations(),
        { provide: VehiclesService, useValue: vehiclesService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();


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
});
