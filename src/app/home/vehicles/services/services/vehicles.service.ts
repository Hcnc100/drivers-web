import { Injectable, signal, Signal } from '@angular/core';
import { IPaginationServices } from '../../../../shared/pagination/interfaces/IPaginationServices';
import { BehaviorSubject, Observable, single, Subject, tap } from 'rxjs';
import { PaginationRequest } from '../../../../shared/pagination/model/pagination.request';
import { PaginatedResult } from '../../../../shared/pagination/model/pagination.result';
import { Vehicle } from '../../model/vehicle';
import { environment } from '../../../../../environments/environment';
import { generatePaginationQuery } from '../../../../utils/generate-pagination-query';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService implements IPaginationServices {

  private readonly controller = environment.apiUrl + environment.apiVersion + '/vehicles';
  notifyChangeSignal: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient
  ) { }


  notifyChange(): void {
    this.notifyChangeSignal.next(Date.now());
  }
  getAllPaginated<Vehicle>(paginationRequest: PaginationRequest): Observable<PaginatedResult<Vehicle>> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Vehicle>>(`${this.controller}?${query}`);
  }
}
