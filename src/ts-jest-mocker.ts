export type Mock<T> = T & {
    // all functions are converted to jest.Mock with corresponding return type (generic passed to jest.Mock)
    [P in keyof T as T[P] extends Function ? P : never]: jest.Mock<T[P] extends (...args: any[]) => any ? ReturnType<T[P]> : never>;
};

export function mock<T>(clazz?: { new(...args: any[]): T }): Mock<T> {
    return new Proxy({} as any, {
        get: (target, property) => {
            if (property in target) {
                return target[property];
            }

            if (clazz?.prototype) {
                const properties = Object.getOwnPropertyNames(clazz.prototype);

                if (properties.includes(property as string)) {
                    target[property] = jest.fn();
                } else {
                    target[property] = undefined;
                }
            }

            if (!(property in target)) {
                target[property] = jest.fn();
            }

            return target[property];
        }
    });
}