import { FunctionsFilter } from './functions-filter';
import { MergedConfig } from './config';

describe('FunctionsFilter', () => {
    let config: MergedConfig = {} as MergedConfig;

    beforeEach(() => {
        config = {
            excludeMethodNames: new Set(['excludeProperty']),
            includeMethodNames: new Set(['includeProperty']),
            failIfMockNotProvided: false,
        };
    });

    it('should filter excluded properties', async () => {
        // GIVEN
        const property = 'excludeProperty';

        // WHEN
        const shouldFilter = FunctionsFilter.shouldFilter(property, config);

        // THEN
        expect(shouldFilter).toBeTruthy();
    });

    it('should not filter excluded properties if the same property is in the include list', async () => {
        // GIVEN
        const property = 'includeProperty';

        config.excludeMethodNames.add('includeProperty'); // is in the "excluded" list, but the "includes" list has higher priority

        // WHEN
        const shouldFilter = FunctionsFilter.shouldFilter(property, config);

        // THEN
        expect(shouldFilter).toBeFalsy();
    });
});
