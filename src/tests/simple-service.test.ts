import {mock} from "ts-jest-mocker";

class SimpleRepository {
    public readonly simpleValue: string;

    constructor() {
        this.simpleValue = 'simple value';
    }

    async doSomething(): Promise<string> {
        return 'value1';
    }

    async doSomethingElse(value: string): Promise<boolean> {
        return true;
    }
}

class SimpleService {
    private readonly privateMember: string;
    public readonly publicMember: string;

    constructor(private readonly repository: SimpleRepository) {
        this.privateMember = 'something private';
        this.publicMember = 'something public';
    }

    doSomething(): Promise<string> {
        return this.repository.doSomething();
    }
}

describe('Simple service', () => {
    it('should mock methods', async () => {
        // GIVEN
        const repository = mock(SimpleRepository);
        const service = new SimpleService(repository);

        repository.doSomething.mockResolvedValueOnce('mocked-value');

        // WHEN
        const value = await service.doSomething();

        // THEN
        expect(repository.doSomething).toHaveBeenCalledTimes(1);
        expect(value).toBe('mocked-value');
    });

    it('should leave other members as undefined', async () => {
        // GIVEN
        const repository = mock(SimpleRepository);

        // WHEN
        // THEN
        expect(repository.simpleValue).toBeUndefined();
    });

    it('should be able to set other member values', async () => {
        // GIVEN
        const repository = mock(SimpleRepository);
        // @ts-ignore
        repository.simpleValue = '13'; // TODO mark other members as non-readonly

        // WHEN
        // THEN
        expect(repository.simpleValue).toBe('13');
    });

    it('should provide types for parameters', async () => {
        // GIVEN
        const repository = mock(SimpleRepository);

        // WHEN
        await repository.doSomethingElse('call1');
        await repository.doSomethingElse('call2');

        // THEN
        expect(repository.doSomethingElse.mock.calls.length).toBe(2);
        expect(repository.doSomethingElse.mock.calls[0][0]).toBe('call1');
        expect(repository.doSomethingElse.mock.calls[1][0]).toBe('call2');
        // repository.doSomethingElse.mock.calls[0][5]; // compilation error as doSomethingElse() parameter has only 1 parameter, not 5
        // repository.doSomethingElse.mock.calls[0][0] = true; // compilation error as doSomethingElse() parameter should be string
        // repository.doSomethingElse.mock.calls[0][0] = 'false'; // compilation error as doSomethingElse() has only one parameter
    });
});