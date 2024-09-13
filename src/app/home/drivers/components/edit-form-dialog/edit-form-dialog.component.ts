import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Driver } from '../../model/driver.types';
import { DialogData } from '../../model/dialog.data';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogAction } from '../../../../shared/model/Dialog.action';
import { MatInputModule } from '@angular/material/input';
import { constants } from '../../../../constants/constants';

@Component({
  selector: 'app-edit-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit-form-dialog.component.html',
  styleUrl: './edit-form-dialog.component.css'
})
export class EditFormDialogComponent {

  readonly dialogRef: MatDialogRef<EditFormDialogComponent> = inject(MatDialogRef<EditFormDialogComponent>);
  private readonly dialogData = inject<DialogData<Driver>>(MAT_DIALOG_DATA);

  readonly drive?: Driver = this.dialogData.data;
  readonly action = this.dialogData.action;

  readonly DialogAction = DialogAction;

  readonly formDriver = new FormGroup({
    name: new FormControl(this.drive?.name, [Validators.required]),
    lastName: new FormControl(this.drive?.lastName, [Validators.required]),
    email: new FormControl(this.drive?.email, [Validators.required, Validators.pattern(constants.PATTERN_EMAIL)]),
    phone: new FormControl(this.drive?.phone, [Validators.required]),
    birthDate: new FormControl(this.drive?.birthDate, [Validators.required]),
  });

  constructor() {
    if (this.action === DialogAction.EDIT) {
      this.formDriver.removeControl('birthDate' as never);
    }
  }


  save() {
    if (this.formDriver.valid) {
      this.dialogRef.close(this.formDriver.value);
    }
  }


}
