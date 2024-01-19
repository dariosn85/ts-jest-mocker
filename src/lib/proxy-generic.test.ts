import { createGenericProxy } from './proxy-generic';

interface TestInterface {
    method1(): boolean;

    method2(): boolean;

    method3(): string;
}

describe('proxy generic', () => {
    it('should proxy all properties', async () => {
        // GIVEN
        // WHEN
        const proxy = createGenericProxy<TestInterface>();

        // THEN
        expect(proxy).toBeDefined();
        expect(proxy.method1).toBeDefined();
        expect(proxy.method2).toBeDefined();
        expect(proxy.method3).toBeDefined();
        expect((proxy as any).method4).toBeDefined(); // unknown method should also be mocked
    });

    it('should throw error on methods whose implementation is not mocked explicitly', async () => {
        const proxy = createGenericProxy<TestInterface>();

        expect(() => {
            proxy.method1();
        }).toThrowError('Method method1 is not mocked');

        expect(() => {
            (proxy as any)[Symbol('foo')]();
        }).toThrowError('Method Symbol(foo) is not mocked');
    });
});
