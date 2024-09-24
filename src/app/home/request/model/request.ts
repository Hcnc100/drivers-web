import { RequestStates } from "./RequestStates.enum";

export interface RequestTrip {
    id: number;
    startPoint: Point;
    endPoint: Point;
    distance: number;
    state: RequestStates;
    createdAt: Date;
}

export interface Point {
    latitude: number;
    longitude: number;
}
