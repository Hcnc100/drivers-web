import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../shared/toast/toast.service';
import { ColumnName } from '../../shared/pagination/model/column.name';
import { PaginationActions } from '../../shared/pagination/model/pagination.actions';
import { RequestService } from './services/request.service';
import { PaginationComponent } from "../../shared/pagination/components/pagination/pagination.component";
import { Point } from './model/request';
import { RequestStates, requestStatesToLabel } from './model/RequestStates.enum';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {

  readonly dialog = inject(MatDialog);
  readonly toast = inject(ToastService);
  readonly requestService = inject(RequestService);

  readonly requestColumns: ColumnName[] = [
    { displayName: 'Id', key: 'id', isSortable: true },
    { displayName: 'Punto de partida', key: 'startPoint', isSortable: false, transform: this.pointToString },
    { displayName: 'Punto de llegada', key: 'endPoint', isSortable: false, transform: this.pointToString },
    { displayName: 'Fecha de solicitud', key: 'createdAt', isSortable: true, transform: this.dateToString },
    { displayName: 'Estado', key: 'state', isSortable: true, transform: requestStatesToLabel }

  ];

  readonly paginationActions: PaginationActions[] = [
    {
      name: 'Ver',
      icon: 'visibility',
      description: 'Ver solicitud',
      action: (data: any) => { }
    }
  ];


  readonly generalActions = [
    {
      name: 'Agregar',
      icon: 'add',
      description: 'Agregar solicitud',
      action: () => { }
    }
  ];


  pointToString(point: Point): string {
    return `${point.latitude}, ${point.longitude}`;
  }

  dateToString(date: Date): string {
    return new Date(date).toLocaleDateString();
  }



}
