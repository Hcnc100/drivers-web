import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, effect, Input, model, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { IPaginationServices } from '../../interfaces/IPaginationServices';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { catchError, debounceTime, distinctUntilChanged, map, merge, Subscription, switchMap, tap } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ColumnName } from '../../model/column.name';
import { toObservable } from '@angular/core/rxjs-interop';
import { PaginatedResult } from '../../model/pagination.result';
import { PaginationRequest } from '../../model/pagination.request';

@Component({
  selector: 'app-pagination-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
  templateUrl: './pagination-grid.component.html',
  styleUrl: './pagination-grid.component.css'
})
export class PaginationGridComponent implements OnInit, OnDestroy {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @Input({ required: true }) paginationServices!: IPaginationServices;

  @Input({ required: true }) tableColumns!: ColumnName[];

  @Input() itemsPerPageOptions = [5, 10, 25, 100];

  @Input({ required: true }) description!: string;

  private subscription?: Subscription;

  search = model('');
  private search$ = toObservable(this.search);

  private isFirstLoading = signal(true);

  displayedColumns = computed(() => {
    return this.tableColumns.map(column => column.displayName);
  });


  private _isLoading = signal(true);
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

  constructor() {

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.search$.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      tap(() => {
        this.paginator?.firstPage();
        this.loadData();
      })
    ).subscribe();
  }

  pageEvent($event: PageEvent) {
    this.loadData();
  }



  sortData($event: any) {
    console.log($event);
    this.loadData();
  }

  private loadData(): void {
    if (this.isFirstLoading()) {
      this._isLoading.set(true);
    }
    this.paginationServices.getAllPaginated(this.calculatePageInfo()).pipe(
      catchError(() => observableOf(null)),
      map(data => {
        if (this.isFirstLoading()) {
          this.isFirstLoading.set(false);
        }
        if (data === null) {
          this.setPaginatorError();
          return [];
        }
        this.calculateNewPageInfo(data);
        return data.result;
      })
    ).subscribe(data => {
      this.data = data
      this._isLoading.set(false);
    });
  }

  private calculatePageInfo(): PaginationRequest {
    return {
      page: this.paginator?.pageIndex + 1 || 1,
      limit: this.paginator?.pageSize || 10,
      sort: this.sort?.active || '',
      order: this.sort?.direction as SortDirection || 'asc',
      search: this.search()
    };
  }

  private setPaginatorError(): void {
    this._totalItems.set(0);
    this._pageSize.set(0);
    this._currentPage.set(0);
    this._totalPages.set(0);
  }

  private calculateNewPageInfo(data: PaginatedResult<unknown>): void {
    this._totalItems.set(data.pagination.totalItems);
    this._pageSize.set(data.pagination.pageSize);
    this._currentPage.set(data.pagination.currentPage - 1);
    this._totalPages.set(data.pagination.totalPages);
  }
}
