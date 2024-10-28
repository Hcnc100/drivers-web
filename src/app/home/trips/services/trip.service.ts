import { Injectable, signal } from '@angular/core';
import { IPaginationServices } from '../../../shared/pagination/interfaces/IPaginationServices';
import { Subject, Observable } from 'rxjs';
import { PaginationRequest } from '../../../shared/pagination/model/pagination.request';
import { PaginatedResult } from '../../../shared/pagination/model/pagination.result';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { generatePaginationQuery } from '../../../utils/generate-pagination-query';
import { Trip } from '../model/Trip';

@Injectable({
  providedIn: 'root'
})
export class TripService implements IPaginationServices {

  private readonly controller = environment.apiUrl + environment.apiVersion + '/trips';

  _notifyChangeSignal = signal<number>(0);
  notifyChangeSignal = this._notifyChangeSignal.asReadonly();

  constructor(
    private readonly http: HttpClient
  ) { }

  getAllPaginated<Trip>(paginationRequest: PaginationRequest): Observable<PaginatedResult<Trip>> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Trip>>(`${this.controller}?${query}`);
  }
  notifyChange(): void {
    this._notifyChangeSignal.set(Date.now());
  }
}
