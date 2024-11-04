import { inject, Injectable, signal, Signal } from '@angular/core';
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
  private readonly http: HttpClient = inject(HttpClient);

  private readonly controller = environment.apiUrl + environment.apiVersion + '/drivers';
  _notifyChangeSignal = signal<number>(0);
  notifyChangeSignal = this._notifyChangeSignal.asReadonly();

  notifyChange(): void {
    this._notifyChangeSignal.set(Date.now());
  }

  getAllPaginated<Driver>(
    paginationRequest: PaginationRequest
  ): Observable<PaginatedResult<Driver>> {

    const query = generatePaginationQuery(paginationRequest);
    return this.http.get<PaginatedResult<Driver>>(`${this.controller}?${query}`);
  }

  private driverToFormData(driver: CreateDriverDto | UpdateDriverDto): FormData {
    const formData = new FormData();
    Object.entries(driver).forEach(([key, value]) => {
      if (key === 'imageProfileFile') {
        if (value) {
          // * If the value is a file, we append it to the formData
          formData.append('imageProfile', value as File);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    return formData;
  }

  createDriver(createDriverDto: CreateDriverDto) {
    const createDriverDtoFormData = this.driverToFormData(createDriverDto);
    return this.http.post<Driver>(this.controller, createDriverDtoFormData).pipe(
      tap(() => this.notifyChange())
    );

  }
  deleteDriver(id: number) {
    return this.http.delete(`${this.controller}/${id}`).pipe(
      tap(() => this.notifyChange())
    );
  }
  updateDriver(id: number, driver: UpdateDriverDto) {
    const driverFormData = this.driverToFormData(driver);
    return this.http.patch<Driver>(`${this.controller}/${id}`, driverFormData).pipe(
      tap(() => this.notifyChange())
    );
  }




}
