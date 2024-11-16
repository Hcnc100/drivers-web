import { generatePaginationQuery } from "./generate-pagination-query";


describe('generatePaginationQuery', () => {
    it('debería retornar un string vacío si no se pasan parámetros', () => {
        const result = generatePaginationQuery({});
        expect(result).toBe('');
    });

    it('debería incluir el parámetro "page" si se proporciona', () => {
        const result = generatePaginationQuery({ page: 1 });
        expect(result).toBe('?page=1');
    });

    it('debería incluir el parámetro "limit" si se proporciona', () => {
        const result = generatePaginationQuery({ limit: 10 });
        expect(result).toBe('?limit=10');
    });

    it('debería incluir múltiples parámetros si se proporcionan', () => {
        const result = generatePaginationQuery({ page: 1, limit: 10 });
        expect(result).toBe('?page=1&limit=10');
    });

    it('debería incluir el parámetro "search" si se proporciona', () => {
        const result = generatePaginationQuery({ search: 'test' });
        expect(result).toBe('?search=test');
    });

    it('debería incluir los parámetros "sort" y "order" si se proporcionan', () => {
        const result = generatePaginationQuery({ sort: 'name', order: 'asc' });
        expect(result).toBe('?sort=name&order=asc');
    });

    it('debería generar un query string completo con todos los parámetros', () => {
        const result = generatePaginationQuery({
            page: 2,
            limit: 20,
            search: 'test',
            sort: 'name',
            order: 'desc',
        });
        expect(result).toBe('?page=2&limit=20&search=test&sort=name&order=desc');
    });
});