import {Class} from "./types";

const excludeFunctions = ['constructor'];

export class FunctionsFinder {
    static find<T>(clazz: Class<T>): Set<string> {
        return this.filter(this.findOwnProperties(clazz));
    }

    private static filter(functions: Set<string>): Set<string> {
        return new Set(Array.from(functions).filter(f => !excludeFunctions.includes(f)));
    }

    private static findOwnProperties(clazz: any): Set<string> {
        if (!clazz || !clazz.prototype) {
            return new Set();
        }

        const properties = Object.getOwnPropertyNames(clazz.prototype);

        const proto = Object.getPrototypeOf(clazz);
        if (proto) {
            return new Set([...properties, ...this.findOwnProperties(proto)]);
        }

        return new Set(properties);
    }
}