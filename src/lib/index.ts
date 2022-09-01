import {createClassProxy} from "./proxy-class";
import {Mock} from "./types";
import {createGenericProxy} from "./proxy-generic";

export function mock<T>(clazz?: { new(...args: any[]): T }): Mock<T> {
    if (clazz) {
        return createClassProxy<T>(clazz);
    }

    return createGenericProxy<T>();
}

export {Mock} from './types';