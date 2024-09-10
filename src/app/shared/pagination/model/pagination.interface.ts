
export interface Pagination {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}