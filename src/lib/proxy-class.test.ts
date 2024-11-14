import { createClassProxy } from './proxy-class';

class TestClass {
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

describe('proxy class', () => {
    it('should proxy all methods', async () => {
        // GIVEN
        const clazz = TestClass;

        // WHEN
        const proxy = createClassProxy(clazz);

        // THEN
        expect(proxy).toBeDefined();
        expect(proxy.method1).toBeDefined();
        expect(proxy.method2).toBeDefined();
        expect(proxy.method3).toBeDefined();
    });

    it('should not proxy not existing methods', async () => {
        // GIVEN
        const clazz = TestClass;

        // WHEN
        const proxy = createClassProxy(clazz);

        // THEN
        expect(proxy).toBeDefined();
        expect((proxy as any).method4).toBeUndefined(); // unknown method should not be mocked
        expect((proxy as any).method5).toBeUndefined(); // unknown method should not be mocked
        expect((proxy as any).method6).toBeUndefined(); // unknown method should not be mocked
    });

    it('should throw error on methods whose implementation is not mocked explicitly', async () => {
        const clazz = TestClass;
        const proxy = createClassProxy(clazz);

        expect(() => {
            proxy.method1();
        }).toThrowError('Method method1 is not mocked');

        expect(() => {
            (proxy as any)[Symbol('foo')]();
        }).toThrowError('Method Symbol(foo) is not mocked');
    });
});
