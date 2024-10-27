import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TripService', () => {
  let service: TripService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(TripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
