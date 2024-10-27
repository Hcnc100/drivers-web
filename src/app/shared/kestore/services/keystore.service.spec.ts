import { TestBed } from '@angular/core/testing';

import { KeystoreService } from './keystore.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('KeystoreService', () => {
  let service: KeystoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]

    });
    service = TestBed.inject(KeystoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
