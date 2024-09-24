import { Component, inject } from '@angular/core';
import { ColumnName } from '../../shared/pagination/model/column.name';
import { PaginationComponent } from "../../shared/pagination/components/pagination/pagination.component";
import { PaginationActions } from '../../shared/pagination/model/pagination.actions';
import { ClientsService } from './services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

  readonly clientService = inject(ClientsService);

  readonly clientColumns: ColumnName[] = [
    { displayName: 'Id', key: 'id', isSortable: true },
    { displayName: 'Nombre', key: 'name', isSortable: true },
    { displayName: 'Apellido', key: 'lastname', isSortable: true },
    { displayName: 'Correo', key: 'email', isSortable: true },
    { displayName: 'Teléfono', key: 'phone', isSortable: false },
  ];

  readonly paginationActions: PaginationActions[] = [];


  readonly generalActions = [
    {
      name: 'Agregar',
      icon: 'add',
      description: 'Agregar cliente',
      action: () => { }
    }
  ];


}
