import { Observable } from "rxjs";
import { PaginatedResult } from "../model/pagination.result";
import { PaginationRequest } from '../model/pagination.request';

export interface IPaginationServices {

    getAllPaginated<T>(
        paginationRequest: PaginationRequest
    ): Observable<PaginatedResult<T>>;
}