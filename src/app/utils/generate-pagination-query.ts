import { PaginationRequest } from "../shared/pagination/model/pagination.request";

export const generatePaginationQuery = (paginationRequest: PaginationRequest): string => {
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