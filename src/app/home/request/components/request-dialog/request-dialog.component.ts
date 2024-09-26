import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MapsComponent } from '../../../../shared/maps/maps.component';
import { DialogData } from '../../../drivers/model/dialog.data';
import { RequestTrip } from '../../model/request';
import { MapsPoint } from '../../../../shared/maps/model/MapsPoint';

@Component({
  selector: 'app-request-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MapsComponent
  ],
  templateUrl: './request-dialog.component.html',
  styleUrl: './request-dialog.component.css'
})
export class RequestDialogComponent {

  readonly dialogRef: MatDialogRef<RequestDialogComponent> = inject(MatDialogRef<RequestDialogComponent>);
  private readonly dialogData = inject<DialogData<RequestTrip>>(MAT_DIALOG_DATA);

  readonly requestTrip = this.dialogData.data;

  readonly listPoints = computed(() => {
    const points: MapsPoint[] = [];

    if (this.requestTrip?.startAddress?.location) {
      points.push({
        lat: this.requestTrip.startAddress.location.latitude!,
        lng: this.requestTrip.startAddress.location.longitude!,
        name: 'Punto de partida'
      });
    }

    if (this.requestTrip?.endAddress?.location) {
      points.push({
        lat: this.requestTrip.endAddress.location.latitude!,
        lng: this.requestTrip.endAddress.location.longitude!,
        name: 'Punto de llegada'
      });
    }

    return points;
  })


}
