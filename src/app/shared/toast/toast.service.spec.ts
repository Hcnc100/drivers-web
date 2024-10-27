import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { ToastrService } from 'ngx-toastr';

describe('ToastService', () => {
  let toastrService: ToastService;
  let service: ToastService;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    TestBed.configureTestingModule({
      providers: [{ provide: ToastrService, useValue: toastrService }]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
