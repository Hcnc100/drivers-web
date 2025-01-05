import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationGridComponent } from './pagination-grid.component';
import { IPaginationServices } from '../../interfaces/IPaginationServices';
import { Observable, of, Subject, throwError } from 'rxjs';
import { PaginationRequest } from '../../model/pagination.request';
import { PaginatedResult } from '../../model/pagination.result';
import { signal } from '@angular/core';
import { ColumnName } from '../../model/column.name';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';



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
  let paginationService = jasmine.createSpyObj<IPaginationServices>('IPaginationServices', ['getAllPaginated', 'notifyChangeSignal', 'notifyChange']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationGridComponent],
      providers:
        [
          provideNoopAnimations(),
        ]
    })
      .compileComponents();

    paginationService.getAllPaginated.and.returnValue(of({
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 100,
        totalPages: 10
      },
      result: ['test1', 'test2']
    }));

    paginationService.notifyChangeSignal.and.returnValue(0);
    paginationService.notifyChange.and.returnValue();

    fixture = TestBed.createComponent(PaginationGridComponent);
    fixture.componentRef.setInput('search', () => { });
    component = fixture.componentInstance;
    component.paginationServices = paginationService;
    component.tableColumns = columsName;
    component.description = 'Test';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllPaginated successfully', () => {
    component.ngOnInit();
    expect(paginationService.getAllPaginated).toHaveBeenCalled();
  });

  it('should call pageEvent', () => {
    const event = new PageEvent();
    component.pageEvent(event);
    expect(paginationService.getAllPaginated).toHaveBeenCalled();
  });

  it('should call sortData', () => {
    const event = { active: 'test1', direction: 'asc' };
    component.sortData(event);
    expect(paginationService.getAllPaginated).toHaveBeenCalled();
  });
});


describe('PaginationGridComponent2', () => {
  let component: PaginationGridComponent;
  let fixture: ComponentFixture<PaginationGridComponent>;
  let paginationService = jasmine.createSpyObj<IPaginationServices>('IPaginationServices', ['getAllPaginated', 'notifyChangeSignal', 'notifyChange']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationGridComponent],
      providers:
        [
          provideNoopAnimations(),
        ]
    })
      .compileComponents();


    const fakeValue: PaginatedResult<string> = null as any;
    paginationService.getAllPaginated.and.returnValue(of(fakeValue));

    paginationService.notifyChangeSignal.and.returnValue(0);
    paginationService.notifyChange.and.returnValue();

    fixture = TestBed.createComponent(PaginationGridComponent);
    fixture.componentRef.setInput('search', () => { });
    component = fixture.componentInstance;
    component.paginationServices = paginationService;
    component.tableColumns = columsName;
    component.description = 'Test';

    fixture.detectChanges();
  });


  it('should call getAllPaginated  with null', () => {
    const fakeValue: PaginatedResult<string> = null as any;
    paginationService.getAllPaginated.and.returnValue(of(fakeValue));
    fixture.detectChanges();
    component.ngOnInit();
    expect(paginationService.getAllPaginated).toHaveBeenCalled();
  });
});


describe('PaginationGridComponent3', () => {
  let component: PaginationGridComponent;
  let fixture: ComponentFixture<PaginationGridComponent>;
  let paginationService = jasmine.createSpyObj<IPaginationServices>('IPaginationServices', ['getAllPaginated', 'notifyChangeSignal', 'notifyChange']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationGridComponent],
      providers:
        [
          provideNoopAnimations(),
        ]
    })
      .compileComponents();

    paginationService.getAllPaginated.and.returnValue(
      throwError(() => new Error('Error'))
    );

    paginationService.notifyChangeSignal.and.returnValue(0);
    paginationService.notifyChange.and.returnValue();

    fixture = TestBed.createComponent(PaginationGridComponent);
    fixture.componentRef.setInput('search', () => { });
    component = fixture.componentInstance;
    component.paginationServices = paginationService;
    component.tableColumns = columsName;
    component.description = 'Test';

    fixture.detectChanges();
  });


  it('should call getAllPaginated with error', () => {
    paginationService.getAllPaginated.and.returnValue(
      throwError(() => new Error('Error'))
    );
    component.ngOnInit();
    expect(paginationService.getAllPaginated).toHaveBeenCalled();
  });
});


