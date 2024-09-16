export type Driver = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    birthdate: string;
    imageProfile?: string;
}


export type UpdateDriverDto = Omit<Driver, 'id' | 'birthdate' | 'imageProfile'> & { imageProfileFile?: File };
export type CreateDriverDto = Omit<Driver, 'id' | 'imageProfile'> & { imageProfileFile?: File };