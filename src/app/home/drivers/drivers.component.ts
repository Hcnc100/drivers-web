import { Component, inject, OnInit, signal } from '@angular/core';
import { CreateDriverDto, Driver, UpdateDriverDto } from './model/driver.types';
import { DriversService } from './services/drivers.service';
import { PaginationRequest } from '../../shared/pagination/model/pagination.request';
import { PaginationGridComponent } from "../../shared/pagination/components/pagination-grid/pagination-grid.component";
import { ColumnName } from '../../shared/pagination/model/column.name';
import { PaginationComponent } from "../../shared/pagination/components/pagination/pagination.component";
import { PaginationActions } from '../../shared/pagination/model/pagination.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditFormDialogComponent } from './components/edit-form-dialog/edit-form-dialog.component';
import { DialogAction } from '../../shared/model/Dialog.action';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [PaginationGridComponent, PaginationComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'
})
export class DriversComponent {

  readonly dialog = inject(MatDialog);

  readonly driverColumns: ColumnName[] = [
    { displayName: 'Id', key: 'id', isSortable: true },
    { displayName: 'Nombre', key: 'name', isSortable: true },
    { displayName: 'Apellido', key: 'lastName', isSortable: true },
    { displayName: 'Correo', key: 'email', isSortable: true },
    { displayName: 'Teléfono', key: 'phone', isSortable: false },

  ];

  readonly paginationActions: PaginationActions[] = [
    {
      name: 'Editar',
      icon: 'edit',
      description: 'Editar conductor',
      action: (data: any) => this.actionDriver(DialogAction.EDIT, data)
    },
    {
      name: 'Eliminar',
      icon: 'delete',
      description: 'Eliminar conductor',
      action: (data: any) => this.deleteDriver(data.id)
    },
    {
      name: 'Ver',
      icon: 'visibility',
      description: 'Ver conductor',
      action: (data: any) => this.actionDriver(DialogAction.OBSERVE, data)
    }
  ];


  readonly generalActions = [
    {
      name: 'Agregar',
      icon: 'add',
      description: 'Agregar conductor',
      action: () => this.actionDriver(DialogAction.CREATE)
    }
  ];

  constructor(
    public driversService: DriversService,
  ) { }


  actionDriver(action: DialogAction, driver?: Driver) {
    console.log('actionDriver', action, driver);
    const response = this.dialog.open(EditFormDialogComponent, {
      width: '500px',
      data: {
        action: action,
        data: driver
      }
    });

    response.afterClosed().subscribe({
      next: (result?: Driver) => this.OnCloseDialog(action, result, driver?.id),
    })
  }


  private OnCloseDialog(action: DialogAction, driver?: Driver, id?: number) {
    if (!driver) return;

    if (action === DialogAction.CREATE) {
      const createDriver: CreateDriverDto = { ...driver };
      this.createDriver(createDriver);
      return;
    }
    if (action === DialogAction.EDIT) {
      const updateDriver: UpdateDriverDto = { ...driver };
      this.updateDriver(id!, updateDriver);
      return;
    }
  }

  private createDriver(createDriverDto: CreateDriverDto) {
    this.driversService.createDriver(createDriverDto).subscribe({
      next: () => console.log('createDriver'),
      error: (error) => console.log('error createDriver', error)
    })
  }

  private updateDriver(id: number, updateDriver: UpdateDriverDto) {
    this.driversService.updateDriver(id, updateDriver).subscribe({
      next: () => console.log('updateDriver'),
      error: (error) => console.log('error updateDriver', error)
    })
  }

  private deleteDriver(id: number) {
    this.driversService.deleteDriver(id).subscribe({
      next: () => console.log('deleteDriver'),
      error: (error) => console.log('error deleteDriver', error)
    })
  }

}
