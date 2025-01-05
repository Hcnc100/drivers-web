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

  it('should if has promise in cache', async () => {
    const apiKey = '123';
    keystoreServiceSpy.getMapsKey.and.returnValue(Promise.resolve(apiKey));


    service["promise"] = Promise.resolve('google maps api loaded');

    const result = await service.load();
    expect(result).toBe('google maps api loaded');
  });

  it('should load google maps api', async () => {
    const apiKey = '123';
    keystoreServiceSpy.getMapsKey.and.returnValue(Promise.resolve(apiKey));

    const result = await service.load();
    expect(result).toBe('google maps api loaded');
  });
});
