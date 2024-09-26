export interface RequestTrip {
    id: number;
    startAddress: Address;
    endAddress: Address;
    distance: number;
    state: string;
    createdAt: Date;
}

export interface Address {
    id: number;
    fullAddress?: string;
    shortAddress?: string;
    street_number?: null;
    street?: null;
    city?: null;
    colony?: null;
    state?: null;
    cp?: null;
    location?: Location;
}

export interface Point {
    latitude?: number;
    longitude?: number;
}