import { Component, effect, Input, signal } from '@angular/core';
import { IPaginationServices } from '../../interfaces/IPaginationServices';
import { ColumnName } from '../../model/column.name';
import { PaginationGridComponent } from "../pagination-grid/pagination-grid.component";
import { SearchGridComponent } from "../search-grid/search-grid.component";


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    PaginationGridComponent,
    SearchGridComponent
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  clearFilter($event: MouseEvent) {
    throw new Error('Method not implemented.');
  }
  applyFilter(arg0: any) {
    throw new Error('Method not implemented.');
  }

  @Input({ required: true }) paginationServices!: IPaginationServices;

  @Input({ required: true }) tableColumns!: ColumnName[];

  @Input() itemsPerPageOptions!: number[];

  @Input({ required: true }) description!: string;

  search = signal('');

  constructor() {

  }
}
