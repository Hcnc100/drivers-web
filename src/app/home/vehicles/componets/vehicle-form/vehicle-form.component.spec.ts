import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormComponent } from './vehicle-form.component';
import { VehiclesService } from '../../services/services/vehicles.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let vehiclesService: jasmine.SpyObj<VehiclesService>;

  beforeEach(async () => {

    vehiclesService = jasmine.createSpyObj<VehiclesService>('VehiclesService', ['getAllPaginated', 'notifyChange']);

    await TestBed.configureTestingModule({
      imports: [VehicleFormComponent],
      providers: [
        { provide: VehiclesService, useValue: vehiclesService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
