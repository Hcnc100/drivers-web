export type Driver = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    birthdate: string;
}


export type UpdateDriverDto = Omit<Driver, 'id' | 'birthdate'>;
export type CreateDriverDto = Omit<Driver, 'id'>;