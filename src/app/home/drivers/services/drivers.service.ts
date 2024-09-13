import { Injectable, signal, Signal } from '@angular/core';
import { IPaginationServices } from '../../../shared/pagination/interfaces/IPaginationServices';
import { BehaviorSubject, Observable, pipe, Subject, tap } from 'rxjs';
import { PaginatedResult } from '../../../shared/pagination/model/pagination.result';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationRequest } from '../../../shared/pagination/model/pagination.request';
import { generatePaginationQuery } from '../../../utils/generate-pagination-query';
import { Driver, UpdateDriverDto, CreateDriverDto } from '../model/driver.types';

@Injectable({
  providedIn: 'root'
})
export class DriversService implements IPaginationServices {

  private readonly controller = environment.apiUrl + environment.apiVersion + '/drivers';
  notifyChangeSignal: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient,
  ) { }

  notifyChange(): void {
    this.notifyChangeSignal.next(Date.now());
  }

  getAllPaginated<Driver>(
    paginationRequest: PaginationRequest
  ): Observable<PaginatedResult<Driver>> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Driver>>(`${this.controller}?${query}`);
  }

  createDriver(createDriverDto: CreateDriverDto) {
    return this.http.post<Driver>(this.controller, createDriverDto).pipe(
      tap(() => this.notifyChange())
    );

  }
  deleteDriver(id: number) {
    return this.http.delete(`${this.controller}/${id}`).pipe(
      tap(() => this.notifyChange())
    );
  }
  updateDriver(id: number, driver: UpdateDriverDto) {
    return this.http.patch<Driver>(`${this.controller}/${id}`, driver).pipe(
      tap(() => this.notifyChange())
    );
  }




}
