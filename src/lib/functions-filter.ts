import { MergedConfig } from './config';

export class FunctionsFilter {
    static shouldFilter(property: string | Symbol, config: MergedConfig): boolean {
        if (config.includeMethodNames.has(property)) {
            return false;
        }

        return config.excludeMethodNames.has(property);
    }
}
