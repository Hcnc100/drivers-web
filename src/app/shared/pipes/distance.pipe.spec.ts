import { DistancePipe } from './distance.pipe';

describe('DistancePipe', () => {
  let pipe: DistancePipe;

  beforeEach(() => {
    pipe = new DistancePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return undefined when no value is provided', () => {
    expect(pipe.transform(undefined)).toBeUndefined();
  });

  it('should return the value in meters when value is less than 1000', () => {
    const result = pipe.transform(999);
    expect(result).toBe('999.00 m');
  });

  it('should return the value in kilometers when value is 1000 or more', () => {
    const result = pipe.transform(1500);
    expect(result).toBe('1.50 km');
  });

  it('should handle edge case of exactly 1000 meters', () => {
    const result = pipe.transform(1000);
    expect(result).toBe('1.00 km');
  });
});