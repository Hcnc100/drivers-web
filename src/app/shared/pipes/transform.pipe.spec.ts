import { CustomTransformPipe } from "./transform.pipe";


describe('CustomTransformPipe', () => {
    let pipe: CustomTransformPipe;

    beforeEach(() => {
        pipe = new CustomTransformPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return the original value if no transform function is provided', () => {
        const value = 'testValue';
        const result = pipe.transform(value);
        expect(result).toBe(value);
    });

    it('should apply the transform function to the value', () => {
        const value = 'testValue';
        const transformFn = (v: string) => v.toUpperCase();
        const result = pipe.transform(value, transformFn);
        expect(result).toBe('TESTVALUE');
    });

    it('should handle numeric transformations', () => {
        const value = 10;
        const transformFn = (v: number) => v * 2;
        const result = pipe.transform(value, transformFn);
        expect(result).toBe(20);
    });

    it('should handle complex object transformations', () => {
        const value = { name: 'John', age: 30 };
        const transformFn = (v: any) => ({ ...v, age: v.age + 1 });
        const result = pipe.transform(value, transformFn);
        expect(result).toEqual({ name: 'John', age: 31 });
    });
});
