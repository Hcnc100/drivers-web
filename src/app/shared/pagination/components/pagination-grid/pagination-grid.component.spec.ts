import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationGridComponent } from './pagination-grid.component';
import { IPaginationServices } from '../../interfaces/IPaginationServices';
import { Observable, of, Subject } from 'rxjs';
import { PaginationRequest } from '../../model/pagination.request';
import { PaginatedResult } from '../../model/pagination.result';
import { signal } from '@angular/core';
import { ColumnName } from '../../model/column.name';
import { provideNoopAnimations } from '@angular/platform-browser/animations';


const mockPaginationService: IPaginationServices = {
  notifyChangeSignal: signal(0),
  getAllPaginated: <T>(paginationRequest: PaginationRequest): Observable<PaginatedResult<T>> => {
    const result: PaginatedResult<T> = {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 100,
        totalPages: 10
      },
      result: ['test1', 'test2'] as unknown as T[]
    };

    return of(result);
  },
  notifyChange: function (): void {
    return;
  }
}

const columsName: ColumnName[] = [

  {
    displayName: 'Test 1',
    key: 'test1',
    isSortable: true
  },
  {
    displayName: 'Test 2',
    key: 'test2',
    isSortable: true
  }

];


describe('PaginationGridComponent', () => {
  let component: PaginationGridComponent;
  let fixture: ComponentFixture<PaginationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationGridComponent],
      providers:
        [
          provideNoopAnimations(),
        ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationGridComponent);
    fixture.componentRef.setInput('search', () => { });
    component = fixture.componentInstance;
    component.paginationServices = mockPaginationService;
    component.tableColumns = columsName;
    component.description = 'Test';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
