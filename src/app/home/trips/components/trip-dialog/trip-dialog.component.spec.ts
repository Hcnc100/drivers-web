import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDialogComponent } from './trip-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapsLoaderService } from '../../../../shared/maps/services/maps-loader.service';
import { KeystoreService } from '../../../../shared/kestore/services/keystore.service';

describe('TripDialogComponent', () => {
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
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
  });
});
