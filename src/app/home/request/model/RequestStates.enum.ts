
export enum RequestStates {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    REJECTED = "REJECTED"
}

export enum RequestStatesLabel {
    PENDING = 'Pendiente',
    IN_PROGRESS = 'En progreso',
    COMPLETED = 'Completado',
    CANCELLED = 'Cancelado',
    REJECTED = 'Rechazado'
}


export const requestStatesToLabel = (state: RequestStates): string => {
    switch (state) {
        case RequestStates.PENDING:
            return RequestStatesLabel.PENDING;
        case RequestStates.IN_PROGRESS:
            return RequestStatesLabel.IN_PROGRESS;
        case RequestStates.COMPLETED:
            return RequestStatesLabel.COMPLETED;
        case RequestStates.CANCELLED:
            return RequestStatesLabel.CANCELLED;
        case RequestStates.REJECTED:
            return RequestStatesLabel.REJECTED;
    }
}