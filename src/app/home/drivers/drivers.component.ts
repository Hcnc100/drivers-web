import { Component, OnInit } from '@angular/core';
import { Driver } from './model/driver';
import { DriversService } from './services/drivers.service';
import { PaginationRequest } from '../../shared/pagination/model/pagination.request';
import { PaginationGridComponent } from "../../shared/pagination/components/pagination-grid/pagination-grid.component";
import { ColumnName } from '../../shared/pagination/model/column.name';
import { PaginationComponent } from "../../shared/pagination/components/pagination/pagination.component";
import { PaginationActions } from '../../shared/pagination/model/pagination.actions';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [PaginationGridComponent, PaginationComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent {

  readonly driverColumns: ColumnName[] = [
    { displayName: 'Id', key: 'id', isSortable: true },
    { displayName: 'Nombre', key: 'name', isSortable: true },
    { displayName: 'Apellido', key: 'lastName', isSortable: true },
    { displayName: 'Correo', key: 'email', isSortable: true },
    { displayName: 'Teléfono', key: 'phone', isSortable: false },

  ];

  readonly actions: PaginationActions[] = [
    {
      name: 'Editar',
      icon: 'edit',
      description: 'Editar conductor',
      action: (data: any) => {
        console.log('Editar', data);
      }
    },
    {
      name: 'Eliminar',
      icon: 'delete',
      description: 'Eliminar conductor',
      action: (data: any) => {
        console.log('Eliminar', data);
      }
    },
    {
      name: 'Ver',
      icon: 'visibility',
      description: 'Ver conductor',
      action: (data: any) => {
        console.log('Ver', data);
      }
    }
  ];

  constructor(
    public driversService: DriversService
  ) { }


}
