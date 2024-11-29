import { TsJestMocker } from './config';
import { mock } from './index';

interface TestInterface {
    method1(): void;

    method2(): void;

    then(): number;
}

describe('Config', () => {
    beforeEach(() => {
        TsJestMocker.setConfig(undefined);
    });

    it('should use global config', async () => {
        // GIVEN
        TsJestMocker.setConfig({
            failIfMockNotProvided: true,
            excludeMethodNames: ['method2'],
        });

        const testMock = mock<TestInterface>();

        // WHEN
        const call = () => testMock.method2();

        // THEN
        expect(call).toThrow('testMock.method2 is not a function');
    });

    it('should use default config values even if global config is defined', async () => {
        // GIVEN
        TsJestMocker.setConfig({
            failIfMockNotProvided: true,
            excludeMethodNames: ['method2'],
        });

        const testMock = mock<TestInterface>();

        // WHEN
        const call = () => testMock.then();

        // THEN
        expect(call).toThrow('testMock.then is not a function');
    });

    it('should override default config with global config', async () => {
        // GIVEN
        TsJestMocker.setConfig({
            failIfMockNotProvided: true,
            includeMethodNames: ['then'],
        });

        const testMock = mock<TestInterface>();

        testMock.then.mockReturnValue(15);

        // WHEN
        const call = () => testMock.then(); // default config says to ignore 'then', but global config includes it

        // THEN
        expect(call).not.toThrow();
        expect(testMock.then).toHaveReturnedWith(15);
    });

    it('should use local config over global config', async () => {
        // GIVEN
        TsJestMocker.setConfig({
            failIfMockNotProvided: true,
            includeMethodNames: ['then'],
        });

        const testMock = mock<TestInterface>({
            excludeMethodNames: ['then4'],
        });

        testMock.then.mockReturnValue(15);

        // WHEN
        const call = () => testMock.then();

        // THEN
        expect(call).not.toThrow();
        expect(testMock.then).toHaveReturnedWith(15);
    });

    describe('isTsJestMockerConfig', () => {
        it('should recognize config', async () => {
            // GIVEN
            const config = {
                failIfMockNotProvided: true,
            };

            // WHEN
            const isConfig = TsJestMocker.isTsJestMockerConfig(config);

            // THEN
            expect(isConfig).toBeTruthy();
        });

        it('should recognize empty object is not a config', async () => {
            // GIVEN
            const config = {};

            // WHEN
            const isConfig = TsJestMocker.isTsJestMockerConfig(config);

            // THEN
            expect(isConfig).toBeFalsy();
        });

        it('should recognize random property object is not a config', async () => {
            // GIVEN
            const config = {
                randomProperty: '123',
            };

            // WHEN
            const isConfig = TsJestMocker.isTsJestMockerConfig(config);

            // THEN
            expect(isConfig).toBeFalsy();
        });
    });
});
