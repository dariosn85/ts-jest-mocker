export interface IRepository {
    isInitialized(): Promise<boolean>;

    getString(): string;

    setString(str: string): void;

    getBoolean(): boolean;

    getNumberAsPromise(): Promise<number>;
}

export class Repository implements IRepository {
    constructor(private readonly name: string) {
    }

    async isInitialized(): Promise<boolean> {
        return true;
    }

    getBoolean(): boolean {
        return false;
    }

    getNumberAsPromise(): Promise<number> {
        return Promise.resolve(123);
    }

    getString(): string {
        return "Test string";
    }

    setString(str: string): void {
    }

}