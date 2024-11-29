import { createClassProxy } from './proxy-class';
import { Mock, MockConfig } from './types';
import { createGenericProxy } from './proxy-generic';
import { TsJestMocker } from './config';

export function mock<T>(clazz?: { new (...args: any[]): T }, mockConfig?: MockConfig): Mock<T>;
export function mock<T>(mockConfig?: MockConfig): Mock<T>;
export function mock<T>(clazzOrMockConfig?: { new (...args: any[]): T } | MockConfig, mockConfig?: MockConfig): Mock<T> {
    if (!clazzOrMockConfig) {
        return createGenericProxy(mockConfig);
    }

    const isFirstParameterMockConfig = TsJestMocker.isTsJestMockerConfig(clazzOrMockConfig);

    if (isFirstParameterMockConfig) {
        return createGenericProxy(clazzOrMockConfig);
    }

    return createClassProxy<T>(clazzOrMockConfig, mockConfig);
}

export { Mock } from './types';
