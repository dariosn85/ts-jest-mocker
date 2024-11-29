import { Class, Mock, MockConfig } from './types';
import { FunctionsFinder } from './functions-finder';
import { FunctionsFilter } from './functions-filter';
import { MergedConfig } from './config';

const defaultConfig: Required<MockConfig> = {
    excludeMethodNames: [],
    failIfMockNotProvided: true,
    includeMethodNames: [],
};

export const createClassProxy = <T>(clazz: Class<T>, mockConfig?: MockConfig): Mock<T> => {
    const config = MergedConfig.merge(defaultConfig, mockConfig);

    const functions = FunctionsFinder.find(clazz);
    return new Proxy({} as any, {
        get: (target, property) => {
            if (property in target) {
                return target[property];
            }

            if (functions.has(property as string) && !FunctionsFilter.shouldFilter(property as string, config)) {
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
