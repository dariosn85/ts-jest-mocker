import { Mock, MockConfig } from './types';
import { FunctionsFilter } from './functions-filter';
import { MergedConfig } from './config';

const defaultConfig: Required<MockConfig> = {
    excludeMethodNames: [
        // "then" is excluded in order to avoid issues with Promises. By standard, if object has "then" method it's "thenable" and
        // "promises will and should assimilate anything with a then method". See https://promisesaplus.com/#point-53 for more details.
        'then',

        // for .toEqual() to work (Jest)
        Symbol.iterator,
    ],
    failIfMockNotProvided: true,
    includeMethodNames: [],
};

export const createGenericProxy = <T>(mockConfig?: MockConfig): Mock<T> => {
    const config = MergedConfig.merge(defaultConfig, mockConfig);

    return new Proxy({} as any, {
        get: (target, property) => {
            if (property in target) {
                return target[property];
            }

            if (!FunctionsFilter.shouldFilter(property as string, config)) {
                target[property] = jest.fn();

                if (config.failIfMockNotProvided) {
                    target[property].mockImplementation(() => {
                        throw new Error(`Method '${String(property)}' is not mocked`);
                    });
                }
            }

            return target[property];
        },
    });
};
