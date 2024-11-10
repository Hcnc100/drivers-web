import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../drivers/model/dialog.data';
import { Vehicle } from '../../model/vehicle';
import { DialogAction } from '../../../../shared/model/Dialog.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { VehiclesService } from '../../services/services/vehicles.service';
import { Make } from '../../model/make';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PaginatedResult } from '../../../../shared/pagination/model/pagination.result';
import { PaginationRequest } from '../../../../shared/pagination/model/pagination.request';
import { Model } from '../../model/model';
import { Color } from '../../model/Color';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})
export class VehicleFormComponent implements OnInit, OnDestroy {


  private readonly vehicleService = inject(VehiclesService);

  readonly dialogRef: MatDialogRef<VehicleFormComponent> = inject(MatDialogRef<VehicleFormComponent>);
  private readonly dialogData = inject<DialogData<Vehicle>>(MAT_DIALOG_DATA);


  readonly vehicle?: Vehicle = this.dialogData.data;
  readonly action = this.dialogData.action;
  readonly DialogAction = DialogAction;
  private makeSubscribe?: Subscription;
  private modelSubscribe?: Subscription;

  readonly vehicleForm = new FormGroup({
    make: new FormControl(this.vehicle?.make, [Validators.required]),
    model: new FormControl(this.vehicle?.model, [Validators.required]),
    color: new FormControl(this.vehicle?.color, [Validators.required]),
    plates: new FormControl(this.vehicle?.plates, [Validators.required]),
    number: new FormControl(this.vehicle?.number, [Validators.required]),
    isRotulated: new FormControl(this.vehicle?.isRotulated, [Validators.required])
  });

  readonly makeOptions = signal<Make[]>([])
  readonly modelOptions = signal<Model[]>([])
  readonly colors = signal<Color[]>([])



  ngOnInit(): void {

    if (this.action === DialogAction.OBSERVE) {
      this.vehicleForm.disable();
      return;
    }

    this.loadColors();
    this.makeSubscribe = this.vehicleForm.controls.make.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value): value is string => !!value && typeof value === 'string' && value.length > 0)
      )
      .subscribe((value) => {
        if (value) {
          const request = this.getPaginationRequest(value);
          this.vehicleService.getListMake(request).subscribe({
            next: makes => this.makeOptions.set(makes)
          });
        }
      });

    this.modelSubscribe = this.vehicleForm.controls.model.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value): value is string => !!value && typeof value === 'string' && value.length > 0)
      )
      .subscribe((value) => {
        if (value) {
          const make = this.vehicleForm.controls.make.value ?? '';
          const request = this.getPaginationRequest(value);
          this.vehicleService.getListModel(make, request).subscribe({
            next: models => this.modelOptions.set(models)
          });
        }
      });
  }

  loadColors() {
    this.vehicleService.getListColor().subscribe({
      next: colors => this.colors.set(colors)
    });
  }

  save() {
    if (this.vehicleForm.valid) {
      const vehicleFrom = <Vehicle>this.vehicleForm.value;
      this.dialogRef.close(vehicleFrom);
    }
  }

  private getPaginationRequest(
    search: string,
  ) {
    return <PaginationRequest>{
      page: 1,
      limit: 3,
      search
    }
  }


  ngOnDestroy(): void {
    this.makeSubscribe?.unsubscribe();
    this.modelSubscribe?.unsubscribe();
  }

}
