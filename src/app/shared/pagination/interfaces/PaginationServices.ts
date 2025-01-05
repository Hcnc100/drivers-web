import { signal, Signal } from "@angular/core";
import { Observable } from "rxjs";
import { PaginationRequest } from "../model/pagination.request";
import { PaginatedResult } from "../model/pagination.result";
import { IPaginationServices } from "./IPaginationServices";

export abstract class PaginationServices implements IPaginationServices {

    private readonly _notifyChangeSignal = signal<number>(0);
    notifyChangeSignal: Signal<number> = this._notifyChangeSignal.asReadonly();

    abstract getAllPaginated<T>(paginationRequest: PaginationRequest): Observable<PaginatedResult<T>>
    notifyChange(): void {
        this._notifyChangeSignal.set(Date.now());
    }

}