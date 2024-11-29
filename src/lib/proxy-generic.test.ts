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
        // GIVEN
        const proxy = createGenericProxy<TestInterface>();

        // WHEN
        const call1 = () => proxy.method1();
        const call2 = () => (proxy as any)[Symbol('foo')]();

        // THEN
        expect(call1).toThrowError(`Method 'method1' is not mocked`);

        expect(call2).toThrowError(`Method 'Symbol(foo)' is not mocked`);
    });

    it('should not throw an error on methods whose implementation is not mocked explicitly when failIfMockNotProvided=false', async () => {
        // GIVEN
        const proxy = createGenericProxy<TestInterface>({
            failIfMockNotProvided: false,
        });

        // WHEN
        const result = proxy.method1();

        // THEN
        expect(result).toBeUndefined();
    });

    it('should handle toEqual properly for same object', async () => {
        // GIVEN
        const testMock = createGenericProxy();

        // WHEN
        // THEN
        expect(testMock).toEqual(testMock);
    });
});
