
export interface ColumnName {
    displayName: string;
    key: string;
    isSortable: boolean;
    transform?: (value: any) => any;
}