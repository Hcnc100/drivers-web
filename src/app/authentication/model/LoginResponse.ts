export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: Date;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
}

export interface Role {
    id: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}