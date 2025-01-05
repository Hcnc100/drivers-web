import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDialogComponent } from './request-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapsLoaderService } from '../../../../shared/maps/services/maps-loader.service';
import { KeystoreService } from '../../../../shared/kestore/services/keystore.service';
import { DialogData } from '../../../drivers/model/dialog.data';
import { RequestTrip } from '../../model/request';
import { DialogAction } from '../../../../shared/model/Dialog.action';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
const mockRequestTrip: RequestTrip = {
  id: 1,
  startAddress: {
    id: 1,
    fullAddress: '123 Main St, Springfield, IL',
    shortAddress: '123 Main St',
    street_number: undefined,
    street: undefined,
    city: 'Springfield',
    colony: undefined,
    state: 'IL',
    cp: undefined,
    location: {
      latitude: 39.7817,
      longitude: -89.6501
    }
  },
  endAddress: {
    id: 2,
    fullAddress: '456 Elm St, Springfield, IL',
    shortAddress: '456 Elm St',
    street_number: undefined,
    street: undefined,
    city: 'Springfield',
    colony: undefined,
    state: 'IL',
    cp: undefined,
    location: {
      latitude: 39.7990,
      longitude: -89.6436
    }
  },
  distance: 10.5,
  state: 'completed',
  createdAt: new Date('2023-10-27T10:00:00Z')
};
const dialogData: DialogData<RequestTrip> = {
  action: DialogAction.OBSERVE,
  data: mockRequestTrip
}

describe('RequestDialogComponent', () => {
  let component: RequestDialogComponent;
  let fixture: ComponentFixture<RequestDialogComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [RequestDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a successful listPoints computed property', () => {
    const expectedPoints = [
      {
        lat: mockRequestTrip.startAddress.location!.latitude!,
        lng: mockRequestTrip.startAddress.location!.longitude!,
        name: 'Punto de partida'
      },
      {
        lat: mockRequestTrip.endAddress.location!.latitude!,
        lng: mockRequestTrip.endAddress.location!.longitude!,
        name: 'Punto de llegada'
      }
    ];
    expect(component.listPoints()).toEqual(expectedPoints);
  });
});
