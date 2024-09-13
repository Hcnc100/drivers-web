
export type PaginationActions = {
    name: string;
    icon: string;
    description: string;
    action: (data: any) => void;
}



export type GeneralActions = Omit<PaginationActions, 'action'> & {
    action: () => void;
}