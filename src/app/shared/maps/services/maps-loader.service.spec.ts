import { TestBed } from '@angular/core/testing';

import { MapsLoaderService } from './maps-loader.service';
import { KeystoreService } from '../../kestore/services/keystore.service';

describe('MapsLoaderService', () => {
  let service: MapsLoaderService;
  let keystoreServiceSpy: jasmine.SpyObj<KeystoreService>;

  beforeEach(() => {
    keystoreServiceSpy = jasmine.createSpyObj<KeystoreService>('KeystoreService', ['getMapId', 'getMapsKey']);

    TestBed.configureTestingModule({
      providers: [
        { provide: KeystoreService, useValue: keystoreServiceSpy }
      ]
    });
    service = TestBed.inject(MapsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
