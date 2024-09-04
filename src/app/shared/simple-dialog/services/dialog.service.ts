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
  constructor() { }


  openDialog(
    simpleDialogData: SimpleDialogData
  ) {
    this.dialodRef = this.dialog.open(DialogComponent, {
      data: simpleDialogData,
      width: '400px',
      height: '200px'
    });

    return this.dialodRef
  }

  closeDialog() {
    this.dialodRef?.close();
  }
}
