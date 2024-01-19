import { IRepository } from './repository';

export class Service {
    constructor(private readonly repository: IRepository) {}

    async doSomething(): Promise<boolean> {
        const isInitialized = await this.repository.isInitialized();

        if (isInitialized) {
            return this.repository.getBoolean();
        }

        throw new Error(`Illegal state`);
    }

    doSomethingElse(): string {
        return this.repository.getString();
    }

    setSomething(str: string): void {
        this.repository.setString(str);
    }
}
