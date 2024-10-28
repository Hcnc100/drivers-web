import { Injectable, signal, Signal } from '@angular/core';
import { IPaginationServices } from '../../../../shared/pagination/interfaces/IPaginationServices';
import { BehaviorSubject, map, Observable, single, Subject, tap } from 'rxjs';
import { PaginationRequest } from '../../../../shared/pagination/model/pagination.request';
import { PaginatedResult } from '../../../../shared/pagination/model/pagination.result';
import { Vehicle } from '../../model/vehicle';
import { environment } from '../../../../../environments/environment';
import { generatePaginationQuery } from '../../../../utils/generate-pagination-query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Make } from '../../model/make';
import { Model } from '../../model/model';
import { Color } from '../../model/Color';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService implements IPaginationServices {



  private readonly controller = environment.apiUrl + environment.apiVersion + '/vehicles';
  _notifyChangeSignal = signal<number>(0);
  notifyChangeSignal = this._notifyChangeSignal.asReadonly();

  constructor(
    private http: HttpClient
  ) { }


  notifyChange(): void {
    this._notifyChangeSignal.set(Date.now());
  }
  getAllPaginated<Vehicle>(paginationRequest: PaginationRequest): Observable<PaginatedResult<Vehicle>> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Vehicle>>(`${this.controller}?${query}`);
  }


  getListMake(paginationRequest: PaginationRequest): Observable<Make[]> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Make>>(`${this.controller}/catalog/makes?${query}`).pipe(
      map((result: PaginatedResult<Make>) => result.result)
    );
  }

  getListModel(make: string, paginationRequest: PaginationRequest): Observable<Model[]> {
    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Model>>(`${this.controller}/catalog/makes/${make}/models?${query}`).pipe(
      map((result: PaginatedResult<Model>) => result.result)
    );
  }

  getListColor(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.controller}/catalog/colors`);
  }

  create(result: Vehicle) {
    return this.http.post<Vehicle>(this.controller, result).pipe(
      tap(() => this.notifyChange())
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.controller}/${id}`).pipe(
      tap(() => this.notifyChange())
    );
  }
  update(id: number, result: Vehicle) {
    return this.http.patch<Vehicle>(`${this.controller}/${id}`, result).pipe(
      tap(() => this.notifyChange())
    );
  }

}
