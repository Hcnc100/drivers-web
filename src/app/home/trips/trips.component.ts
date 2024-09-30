import { Component, inject, Inject } from '@angular/core';
import { PaginationComponent } from "../../shared/pagination/components/pagination/pagination.component";
import { TripService } from './services/trip.service';
import { GeneralActions } from '../../shared/pagination/model/pagination.actions';
import { ColumnName } from '../../shared/pagination/model/column.name';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {

  readonly tripsService = inject(TripService);


  readonly tripsColumns: ColumnName[] = [
    { displayName: 'Id', key: 'id', isSortable: false, width: '20%' },
    { displayName: 'Fecha de inicio', key: 'startAt', isSortable: true, transform: this.dateToString },
    { displayName: 'Fecha de fin', key: 'endAt', isSortable: true, transform: this.dateToString },
    { displayName: 'Estado', key: 'tripState', isSortable: true, transform: this.tripStateToString },
    { displayName: 'Cliente', key: 'client', isSortable: false, transform: (client) => client.name },
    { displayName: 'Conductor', key: 'driver', isSortable: false, transform: (driver) => driver.name }
  ];

  readonly paginationActions = [];
  readonly generalActions: GeneralActions[] = [];


  dateToString(date: Date): string {
    if (!date) return 'Sin fecha';
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  }

  tripStateToString(state: string): string {
    switch (state) {
      case 'ACTIVE': return 'En curso';
      case 'FINISHED': return 'Finalizado';
      case 'CANCELED': return 'Cancelado';
      default: return 'Desconocido';
    }
  }
}
