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
  private readonly data = inject<SimpleDialogData>(MAT_DIALOG_DATA);


  readonly title = this.data.title;
  readonly message = this.data.message;
  readonly confirmButtonText = this.data.confirmButton;

}
