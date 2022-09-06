import {createGenericProxy} from "./proxy-generic";

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
});