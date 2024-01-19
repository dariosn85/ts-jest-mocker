import { FunctionsFinder } from './functions-finder';

export class TestClass {
    private readonly testValue: string;

    public readonly lambda1 = () => 'lambda 1 value';

    constructor() {
        this.testValue = 'test value';
    }

    method1(): boolean {
        return true;
    }

    method2(): boolean {
        return false;
    }

    method3(): string {
        return 'test';
    }
}

describe('functions finder', () => {
    it('should find all functions', async () => {
        // GIVEN
        const clazz = TestClass;

        // WHEN
        const functions = FunctionsFinder.find(clazz);

        // THEN
        expect(functions).toBeDefined();
        expect(functions.size).toBe(3); // TODO should be 4
        expect(functions.has('method1')).toBeTruthy();
        expect(functions.has('method2')).toBeTruthy();
        expect(functions.has('method3')).toBeTruthy();
        //expect(functions.has('lambda1')).toBeTruthy(); // TODO
        expect(functions.has('constructor')).toBeFalsy();
    });
});
