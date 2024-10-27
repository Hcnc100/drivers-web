import { TestBed } from '@angular/core/testing';

import { DriversService } from './drivers.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(DriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
