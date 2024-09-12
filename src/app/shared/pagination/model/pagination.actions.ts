
export interface PaginationActions {
    name: string;
    icon: string;
    description: string;
    action: (data: any) => void;
}