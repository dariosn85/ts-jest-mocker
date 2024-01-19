import { Repository } from './repository';

export class Service2 {
    constructor(private readonly repository: Repository) {}

    doSomething(): string {
        return this.repository.getString();
    }

    setSomething(str: string): void {
        this.repository.setString(str);
    }
}
