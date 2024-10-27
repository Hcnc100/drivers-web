import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDialogComponent } from './request-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapsLoaderService } from '../../../../shared/maps/services/maps-loader.service';
import { KeystoreService } from '../../../../shared/kestore/services/keystore.service';

describe('RequestDialogComponent', () => {
  let component: RequestDialogComponent;
  let fixture: ComponentFixture<RequestDialogComponent>;
  let mapsLoaderService: jasmine.SpyObj<MapsLoaderService>;
  let keystoreServiceSpy: jasmine.SpyObj<KeystoreService>;

  beforeEach(async () => {

    keystoreServiceSpy = jasmine.createSpyObj<KeystoreService>('KeystoreService', ['getMapId', 'getMapsKey']);
    mapsLoaderService = jasmine.createSpyObj<MapsLoaderService>('MapsLoaderService', ['load']);

    await TestBed.configureTestingModule({
      imports: [RequestDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MapsLoaderService, useValue: mapsLoaderService },
        { provide: KeystoreService, useValue: keystoreServiceSpy }
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
});
