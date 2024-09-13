import { Component, input, Input, signal } from '@angular/core';
import { IPaginationServices } from '../../interfaces/IPaginationServices';
import { ColumnName } from '../../model/column.name';
import { PaginationGridComponent } from "../pagination-grid/pagination-grid.component";
import { SearchGridComponent } from "../search-grid/search-grid.component";
import { PaginationActions } from '../../model/pagination.actions';


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



  @Input({ required: true }) paginationServices!: IPaginationServices;

  @Input({ required: true }) tableColumns!: ColumnName[];

  @Input() itemsPerPageOptions!: number[];

  @Input({ required: true }) description!: string;

  @Input({ required: true }) actions: PaginationActions[] = [];


  search = "";
  isLoading = signal(true);

  constructor() {

  }
}
