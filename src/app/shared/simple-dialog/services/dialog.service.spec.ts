import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { SimpleDialogData } from '../model/simple-dialog.data';

describe('DialogService', () => {
  let service: DialogService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(() => {
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatDialogRef, useValue: matDialogRefSpy }
      ]
    });

    service = TestBed.inject(DialogService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DialogComponent>>;

    dialogSpy.open.and.returnValue(dialogRefSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a dialog with the provided data', () => {
    const dialogData: SimpleDialogData = {
      title: 'Test Title',
      message: 'Test Message',
      confirmButton: 'OK'
    };

    service.openDialog(dialogData);

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      data: dialogData,
      width: '400px',
      height: '300px'
    });
  });

  it('should open a dialog with an error message', () => {
    const errorMessage = 'An error occurred';

    service.showErrorMessage(errorMessage);

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      data: {
        title: 'Error',
        message: errorMessage,
        confirmButton: 'Aceptar'
      },
      width: '400px',
      height: '300px'
    });
  });


  it('should not throw an error if closeDialog is called without an open dialog', () => {
    dialogRefSpy.close.and.callFake(() => { });
    service['dialodRef'] = null;

    expect(() => service.closeDialog()).not.toThrow();
  });
});
