import { inject, Injectable, signal } from '@angular/core';
import { IPaginationServices } from '../../../shared/pagination/interfaces/IPaginationServices';
import { Subject, Observable } from 'rxjs';
import { PaginationRequest } from '../../../shared/pagination/model/pagination.request';
import { PaginatedResult } from '../../../shared/pagination/model/pagination.result';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { generatePaginationQuery } from '../../../utils/generate-pagination-query';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService implements IPaginationServices {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly controller = environment.apiUrl + environment.apiVersion + '/client';

  _notifyChangeSignal = signal<number>(0);
  notifyChangeSignal = this._notifyChangeSignal.asReadonly();

  getAllPaginated<Client>(paginationRequest: PaginationRequest): Observable<PaginatedResult<Client>> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Client>>(`${this.controller}?${query}`);
  }
  notifyChange(): void {
    this._notifyChangeSignal.set(Date.now());
  }
}
