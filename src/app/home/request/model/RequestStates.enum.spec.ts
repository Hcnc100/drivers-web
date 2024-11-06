import { RequestStates, RequestStatesLabel, requestStatesToLabel } from "./RequestStates.enum";


describe('requestStatesToLabel', () => {
    it('should return the correct label for PENDING', () => {
        expect(requestStatesToLabel(RequestStates.PENDING)).toBe(RequestStatesLabel.PENDING);
    });

    it('should return the correct label for IN_PROGRESS', () => {
        expect(requestStatesToLabel(RequestStates.IN_PROGRESS)).toBe(RequestStatesLabel.IN_PROGRESS);
    });

    it('should return the correct label for COMPLETED', () => {
        expect(requestStatesToLabel(RequestStates.COMPLETED)).toBe(RequestStatesLabel.COMPLETED);
    });

    it('should return the correct label for CANCELLED', () => {
        expect(requestStatesToLabel(RequestStates.CANCELLED)).toBe(RequestStatesLabel.CANCELLED);
    });

    it('should return the correct label for REJECTED', () => {
        expect(requestStatesToLabel(RequestStates.REJECTED)).toBe(RequestStatesLabel.REJECTED);
    });

});