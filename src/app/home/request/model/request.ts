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
    street_number?: string;
    street?: string;
    city?: string;
    colony?: string;
    state?: string;
    cp?: string;
    location?: Location;
}

export interface Location {
    latitude?: number;
    longitude?: number;
}