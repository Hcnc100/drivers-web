import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PaginatedResult } from "../model/pagination.result";
import { PaginationRequest } from '../model/pagination.request';
import { Signal, signal } from '@angular/core';

export interface IPaginationServices {

    notifyChangeSignal: Signal<number>;

    getAllPaginated<T>(
        paginationRequest: PaginationRequest
    ): Observable<PaginatedResult<T>>;

    notifyChange(): void;
}