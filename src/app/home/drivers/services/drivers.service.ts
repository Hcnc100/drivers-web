import { Injectable } from '@angular/core';
import { IPaginationServices } from '../../../shared/pagination/interfaces/IPaginationServices';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../shared/pagination/model/pagination.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationRequest } from '../../../shared/pagination/model/pagination.request';

@Injectable({
  providedIn: 'root'
})
export class DriversService implements IPaginationServices {

  controller = environment.apiUrl + environment.apiVersion + '/drivers';

  constructor(
    private http: HttpClient
  ) { }
  getAllPaginated<Driver>(
    paginationRequest: PaginationRequest
  ): Observable<PaginatedResult<Driver>> {
    console.log('paginationRequest', paginationRequest);
    const query = this.createQuery(paginationRequest);
    return this.http.get<PaginatedResult<Driver>>(`${this.controller}?${query}`);
  }

  private createQuery(paginationRequest: PaginationRequest): string {
    let query = '';
    if (paginationRequest.page) {
      query += `page=${paginationRequest.page}`;
    }
    if (paginationRequest.limit) {
      query += `&limit=${paginationRequest.limit}`;
    }
    if (paginationRequest.search) {
      query += `&search=${paginationRequest.search}`;
    }
    if (paginationRequest.sort) {
      query += `&sort=${paginationRequest.sort}`;
    }
    if (paginationRequest.order) {
      query += `&order=${paginationRequest.order}`;
    }
    return query;
  }
}
