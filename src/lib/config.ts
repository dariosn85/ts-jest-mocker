export type MockConfig = RequireAtLeastOne<MockConfigInternal>;

export interface MockConfigInternal {
    /**
     * The list of methods/functions (names) which will be excluded from mocking while creating mock.
     */
    excludeMethodNames?: Array<string>;

    /**
     * The list of methods/functions (names) which will be included for mocking while creating mock.
     */
    includeMethodNames?: Array<string>;

    /**
     * If set to <i>true</i>, methods that are called, but not mocked by user, will throw an error and fail tests.
     */
    failIfMockNotProvided?: boolean;
}

export interface MergedConfig {
    excludeMethodNames: Set<string>;
    includeMethodNames: Set<string>;
    failIfMockNotProvided: boolean;
}

export interface GlobalTsJestMocker {
    config?: MockConfig;
}

export namespace MergedConfig {
    /**
     * Merges local or global config with default values.
     */
    export function merge(defaultConfig: Required<MockConfig>, localConfig?: MockConfig): MergedConfig {
        const globalConfig = TsJestMocker.getConfig();

        const excludeMethodNames = [
            ...defaultConfig.excludeMethodNames,
            ...(localConfig?.excludeMethodNames ?? globalConfig?.excludeMethodNames ?? []),
        ];
        const includeMethodNames = [
            ...defaultConfig.includeMethodNames,
            ...(localConfig?.includeMethodNames ?? globalConfig?.includeMethodNames ?? []),
        ];

        return {
            excludeMethodNames: new Set(excludeMethodNames),
            includeMethodNames: new Set(includeMethodNames),
            failIfMockNotProvided:
                localConfig?.failIfMockNotProvided ?? globalConfig?.failIfMockNotProvided ?? defaultConfig.failIfMockNotProvided,
        };
    }
}

export type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

export namespace TsJestMocker {
    /**
     * Sets global {@link MockConfig}.
     *
     * @param config The TS Jest Mocker configuration that will be used for all mocks by default.
     */
    export function setConfig(config: MockConfig | undefined): void {
        (global as GlobalTsJestMocker).config = config;
    }

    /**
     * Gets global {@link MockConfig}.
     */
    export function getConfig(): MockConfig | undefined {
        return (global as GlobalTsJestMocker).config;
    }

    /**
     * Type Guard to check whether specified Object is {@link MockConfig}.
     */
    export function isTsJestMockerConfig(obj: Record<any, any>): obj is MockConfig {
        if (!obj) {
            return false;
        }

        if (obj.hasOwnProperty('excludeMethodNames')) {
            return true;
        } else if (obj.hasOwnProperty('includeMethodNames')) {
            return true;
        } else if (obj.hasOwnProperty('failIfMockNotProvided')) {
            return true;
        }

        return false;
    }
}
