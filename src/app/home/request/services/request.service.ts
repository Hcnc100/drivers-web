import { Injectable, signal } from '@angular/core';
import { IPaginationServices } from '../../../shared/pagination/interfaces/IPaginationServices';
import { Subject, Observable } from 'rxjs';
import { PaginationRequest } from '../../../shared/pagination/model/pagination.request';
import { PaginatedResult } from '../../../shared/pagination/model/pagination.result';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { generatePaginationQuery } from '../../../utils/generate-pagination-query';
import { RequestTrip } from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService implements IPaginationServices {

  private readonly controller = environment.apiUrl + environment.apiVersion + '/request';
  _notifyChangeSignal = signal<number>(0);
  notifyChangeSignal = this._notifyChangeSignal.asReadonly();

  constructor(
    private readonly http: HttpClient,
  ) { }


  getAllPaginated<RequestTrip>(paginationRequest: PaginationRequest): Observable<PaginatedResult<RequestTrip>> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<RequestTrip>>(`${this.controller}?${query}`);
  }
  notifyChange(): void {
    this._notifyChangeSignal.set(Date.now());
  }
}
