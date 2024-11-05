import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriversFormDialogComponent } from './drivers-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DialogData } from '../../model/dialog.data';
import { Driver } from '../../model/driver.types';
import { DialogAction } from '../../../../shared/model/Dialog.action';


const driver = {
  id: 1,
  name: 'test',
  email: 'example@emial.com',
  birthdate: new Date().toISOString(),
  lastname: 'test',
  phone: '123456789',
}


const driverObserverData: DialogData<Driver> = {
  action: DialogAction.OBSERVE,
  data: driver
};

const driverCreateData: DialogData<Driver> = {
  action: DialogAction.EDIT,
  data: driver
};

describe('EditFormDialogComponent with observer action', () => {
  let component: DriversFormDialogComponent;
  let fixture: ComponentFixture<DriversFormDialogComponent>;


  beforeEach(async () => {



    await TestBed.configureTestingModule({
      imports: [DriversFormDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: driverObserverData }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DriversFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set formDriver to disabled', () => {
    component.ngOnInit();
    expect(component.formDriver.enabled).toBeFalse();
  });


});

describe('EditFormDialogComponent with edit action', () => {
  let component: DriversFormDialogComponent;
  let fixture: ComponentFixture<DriversFormDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DriversFormDialogComponent>>;

  beforeEach(async () => {

    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DriversFormDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: driverCreateData }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DriversFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set formDriver to enabled', () => {
    component.ngOnInit();
    expect(component.formDriver.enabled).toBeTrue();
  });

  it('should nothing if the form is invalid', () => {
    component.formDriver.reset();

    component.save();

    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog with formDriver value', () => {
    component.formDriver.patchValue({
      ...driver,
    });

    component.save();
    expect(component.formDriver.valid).toBeTrue();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
