import { Component, inject, Input, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SimpleDialogData } from '../model/simple-dialog.data';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<SimpleDialogData>(MAT_DIALOG_DATA);
  readonly simpleDialogData = model(this.data);

}
