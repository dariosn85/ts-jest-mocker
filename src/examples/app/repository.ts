export interface IRepository {
    isInitialized(): Promise<boolean>;

    getString(): string;

    setString(str: string): void;

    getBoolean(): boolean;

    getNumberAsPromise(): Promise<number>;
}

export class Repository implements IRepository {
    private readonly logger: any;
    public xyz: string;

    constructor(private readonly name: string) {
        this.logger = {};
        this.xyz = 'xyz';
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