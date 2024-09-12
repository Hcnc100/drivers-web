import { Component } from '@angular/core';
import { VehiclesService } from './services/services/vehicles.service';
import { ColumnName } from '../../shared/pagination/model/column.name';
import { PaginationActions } from '../../shared/pagination/model/pagination.actions';
import { PaginationComponent } from "../../shared/pagination/components/pagination/pagination.component";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  readonly vehicleColums: ColumnName[] = [
    { key: 'id', displayName: 'ID', isSortable: true },
    { key: 'number', displayName: 'Número', isSortable: true },
    { key: 'isRotulated', displayName: 'Rotulado', isSortable: true },
    { key: 'brand', displayName: 'Marca', isSortable: true },
    { key: 'model', displayName: 'Modelo', isSortable: true },
    { key: 'color', displayName: 'Color', isSortable: true },

  ];

  readonly actions: PaginationActions[] = [
    {
      name: 'Editar',
      icon: 'edit',
      description: 'Editar vehículo',
      action: (data: any) => {
        console.log('Editar', data);
      }
    },
    {
      name: 'Eliminar',
      icon: 'delete',
      description: 'Eliminar vehículo',
      action: (data: any) => {
        console.log('Eliminar', data);
      }
    },
    {
      name: 'Ver',
      icon: 'visibility',
      description: 'Ver vehículo',
      action: (data: any) => {
        console.log('Ver', data);
      }
    }
  ];

  constructor(
    public vehiclesService: VehiclesService,
  ) { }

}
