import { Class, Mock } from './types';
import { FunctionsFinder } from './functions-finder';

export const createClassProxy = <T>(clazz: Class<T>): Mock<T> => {
    const functions = FunctionsFinder.find(clazz);
    return new Proxy({} as any, {
        get: (target, property) => {
            if (property in target) {
                return target[property];
            }

            if (functions.has(property as string)) {
                target[property] = jest.fn();
            }

            return target[property];
        },
    });
};
