import { PaginationRequest } from "../shared/pagination/model/pagination.request";
export const generatePaginationQuery = (paginationRequest: PaginationRequest): string => {
    const queryParts: string[] = [];

    if (paginationRequest.page) {
        queryParts.push(`page=${paginationRequest.page}`);
    }
    if (paginationRequest.limit) {
        queryParts.push(`limit=${paginationRequest.limit}`);
    }
    if (paginationRequest.search) {
        queryParts.push(`search=${paginationRequest.search}`);
    }
    if (paginationRequest.sort) {
        queryParts.push(`sort=${paginationRequest.sort}`);
    }
    if (paginationRequest.order) {
        queryParts.push(`order=${paginationRequest.order}`);
    }

    return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
};