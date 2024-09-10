import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, Input, model, OnInit, signal, ViewChild } from '@angular/core';
import { IPaginationServices } from '../../interfaces/IPaginationServices';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { catchError, map, merge, switchMap } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ColumnName } from '../../model/column.name';

@Component({
  selector: 'app-pagination-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule, MatTableModule,
  ],
  templateUrl: './pagination-grid.component.html',
  styleUrl: './pagination-grid.component.css'
})
export class PaginationGridComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @Input({ required: true }) paginationServices!: IPaginationServices;

  @Input({ required: true }) tableColumns!: ColumnName[];

  @Input() itemsPerPageOptions = [5, 10, 25, 100];

  @Input({ required: true }) description!: string;


  displayedColumns = computed(() => {
    return this.tableColumns.map(column => column.displayName);
  });


  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  private _totalItems = signal(0);
  totalItem = this._totalItems.asReadonly();

  private _totalPages = signal(0);
  totalPages = this._totalPages.asReadonly();

  private _currentPage = signal(0);
  currentPage = this._currentPage.asReadonly();

  private _pageSize = signal(10);
  pageSize = this._pageSize.asReadonly();


  data: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData();

  }

  pageEvent($event: PageEvent) {
    this.loadData();
  }



  sortData($event: any) {
    console.log($event);
    this.loadData();
  }

  private loadData(): void {
    this._isLoading.set(true);
    this.paginationServices.getAllPaginated({
      page: this.paginator?.pageIndex + 1 || 1,
      limit: this.paginator?.pageSize || 10,
      sort: this.sort?.active || '',
      order: this.sort?.direction as SortDirection || 'asc'
    }).pipe(
      catchError(() => observableOf(null)),
      map(data => {

        this._isLoading.set(false);

        if (data === null) {
          return [];
        }

        this._totalItems.set(data.pagination.totalItems);
        return data.result;
      })
    ).subscribe(data => { this.data = data });
  }
}
