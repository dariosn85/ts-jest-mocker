import { Mock } from './types';

export const createGenericProxy = <T>(): Mock<T> => {
    return new Proxy({} as any, {
        get: (target, property) => {
            if (property in target) {
                return target[property];
            }

            target[property] = jest.fn().mockImplementation(() => {
                throw new Error(`Method ${String(property)} is not mocked`);
            });

            return target[property];
        },
    });
};
