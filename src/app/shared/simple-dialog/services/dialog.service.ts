import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SimpleDialogData } from '../model/simple-dialog.data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialog = inject(MatDialog);
  private dialodRef: any;


  openDialog(
    simpleDialogData: SimpleDialogData
  ) {
    this.dialodRef = this.dialog.open(DialogComponent, {
      data: simpleDialogData,
      width: '400px',
      height: '300px'
    });

    return this.dialodRef
  }

  showErrorMessage(message: string) {
    return this.openDialog({
      title: 'Error',
      message: message,
      confirmButton: 'Aceptar'
    });
  }

  closeDialog() {
    this.dialodRef?.close();
  }
}
