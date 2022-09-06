import {mock} from "ts-jest-mocker";

class BaseOfBase {
    async base(): Promise<string> {
        return 'base value';
    }
}

class BaseRepository extends BaseOfBase {
    async doSomething(): Promise<string> {
        return 'value1';
    }
}

class Repository extends BaseRepository {
    async doSomethingElse(): Promise<string> {
        return 'something else';
    }
}

class SimpleService {
    constructor(private readonly repository: Repository) {
    }

    doSomething(): Promise<string> {
        return this.repository.doSomething();
    }

    doSomethingElse(): Promise<string> {
        return this.repository.doSomethingElse();
    }

    base(): Promise<string> {
        return this.repository.base();
    }
}

describe('Simple service', () => {
    it('should be able to mock methods from extended class', async () => {
        // GIVEN
        const repository = mock(Repository);
        const service = new SimpleService(repository);

        repository.doSomething.mockResolvedValueOnce('mocked-value');
        repository.doSomethingElse.mockResolvedValueOnce('mocked-value-else');
        repository.base.mockResolvedValueOnce('mocked-value-base');

        // WHEN
        const value = await service.doSomething();
        const value2 = await service.doSomethingElse();
        const value3 = await service.base();

        // THEN
        expect(repository.doSomething).toHaveBeenCalledTimes(1);
        expect(value).toBe('mocked-value');

        expect(repository.doSomethingElse).toHaveBeenCalledTimes(1);
        expect(value2).toBe('mocked-value-else');

        expect(repository.base).toHaveBeenCalledTimes(1);
        expect(value3).toBe('mocked-value-base');
    });
});