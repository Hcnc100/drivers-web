import { Injectable } from '@angular/core';
import { IPaginationServices } from '../../../shared/pagination/interfaces/IPaginationServices';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../shared/pagination/model/pagination.result';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaginationRequest } from '../../../shared/pagination/model/pagination.request';
import { generatePaginationQuery } from '../../../utils/generate-pagination-query';

@Injectable({
  providedIn: 'root'
})
export class DriversService implements IPaginationServices {

  private readonly controller = environment.apiUrl + environment.apiVersion + '/drivers';

  constructor(
    private http: HttpClient
  ) { }
  getAllPaginated<Driver>(
    paginationRequest: PaginationRequest
  ): Observable<PaginatedResult<Driver>> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Driver>>(`${this.controller}?${query}`);
  }


}
