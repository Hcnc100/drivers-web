export type Driver = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
}


export type UpdateDriverDto = Omit<Driver, 'id' | 'birthDate'>;
export type CreateDriverDto = Omit<Driver, 'id'>;