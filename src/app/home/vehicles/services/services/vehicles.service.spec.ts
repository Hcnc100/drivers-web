import { TestBed } from '@angular/core/testing';

import { VehiclesService } from './vehicles.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(VehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
