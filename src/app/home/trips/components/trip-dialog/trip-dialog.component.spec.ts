import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDialogComponent } from './trip-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapsLoaderService } from '../../../../shared/maps/services/maps-loader.service';
import { KeystoreService } from '../../../../shared/kestore/services/keystore.service';
import { DialogData } from '../../../drivers/model/dialog.data';
import { Trip } from '../../model/Trip';
import { DialogAction } from '../../../../shared/model/Dialog.action';

const mockRequestTripWithOutTracking: Trip = {
  id: "1",
  startAt: new Date(),
  endAt: null,
  tripState: "IN_PROGRESS",
  client: {
    id: 1,
    name: "Client Name"
  },
  driver: {
    id: 1,
    name: "Driver Name"
  },
};

const mockRequestTrip: Trip = {
  ...mockRequestTripWithOutTracking,
  tracking: 'tracking'
};


const tripDataWithTracking: DialogData<Trip> = {
  action: DialogAction.OBSERVE,
  data: mockRequestTrip
}

const tripDataWithOutTracking: DialogData<Trip> = {
  action: DialogAction.OBSERVE,
  data: mockRequestTripWithOutTracking
}

describe('TripDialogComponent1', () => {
  let component: TripDialogComponent;
  let fixture: ComponentFixture<TripDialogComponent>;
  let mapsLoaderService: jasmine.SpyObj<MapsLoaderService>;
  let keystoreServiceSpy: jasmine.SpyObj<KeystoreService>;


  beforeEach(async () => {
    mapsLoaderService = jasmine.createSpyObj<MapsLoaderService>('MapsLoaderService', ['load']);
    keystoreServiceSpy = jasmine.createSpyObj<KeystoreService>('KeystoreService', ['getMapId', 'getMapsKey']);

    await TestBed.configureTestingModule({
      imports: [TripDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: tripDataWithTracking },
        { provide: MapsLoaderService, useValue: mapsLoaderService },
        { provide: KeystoreService, useValue: keystoreServiceSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.polylineEncode).toEqual('tracking');
  });
});

describe('TripDialogComponent2', () => {
  let component: TripDialogComponent;
  let fixture: ComponentFixture<TripDialogComponent>;
  let mapsLoaderService: jasmine.SpyObj<MapsLoaderService>;
  let keystoreServiceSpy: jasmine.SpyObj<KeystoreService>;

  beforeEach(async () => {
    mapsLoaderService = jasmine.createSpyObj<MapsLoaderService>('MapsLoaderService', ['load']);
    keystoreServiceSpy = jasmine.createSpyObj<KeystoreService>('KeystoreService', ['getMapId', 'getMapsKey']);

    await TestBed.configureTestingModule({
      imports: [TripDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: tripDataWithOutTracking },
        { provide: MapsLoaderService, useValue: mapsLoaderService },
        { provide: KeystoreService, useValue: keystoreServiceSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.polylineEncode).toBeNull();
  });


});