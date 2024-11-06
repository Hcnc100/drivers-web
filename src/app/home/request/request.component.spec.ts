import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComponent } from './request.component';
import { ToastService } from '../../shared/toast/toast.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Address, RequestTrip } from './model/request';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from './components/request-dialog/request-dialog.component';


const request: RequestTrip = {
  id: 1,
} as RequestTrip;


describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;
  let toastsServiceSpy: jasmine.SpyObj<ToastService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {

    toastsServiceSpy = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [RequestComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: ToastService, useValue: toastsServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    })
      .compileComponents();

    spyOn(console, 'log');

    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call show request when clicked invisibility action', () => {

    component.paginationActions[0].action(request);

    expect(dialogSpy.open).toHaveBeenCalledWith(RequestDialogComponent, {
      data: {
        data: request
      },
      width: '70%',
      maxWidth: '1200px',
      disableClose: true
    });

  });

  it('should call thorw error when clicked in add action', () => {
    expect(() => component.generalActions[0].action()).toThrowError('Not implemented');
  });

  it('should call addressToString', () => {
    const address: Address = {
      id: 1,
      shortAddress: 'Calle 1'
    };
    expect(component.addressToString(address)).toBe('Calle 1');
  });

  it('should call addressToString with no short address', () => {
    const address: Address = {
      id: 1
    };
    expect(component.addressToString(address)).toBe('Sin dirección');
  });

  it('should call dateToString', () => {
    const date = new Date();
    expect(component.dateToString(date)).toBe(date.toLocaleDateString());
  });
});
