export interface Trip {
    id: string;
    startAt: Date;
    endAt: null;
    tripState: string;
    client: {
        id: number;
        name: string;
    };
    driver: {
        id: number;
        name: string;
    };
    tracking?: Tracking[];
}


export interface Tracking {
    lat: number;
    lng: number;
}
