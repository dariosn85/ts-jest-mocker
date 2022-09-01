import {mock} from "ts-jest-mocker";

class SimpleRepository {
    public readonly simpleValue: string;

    constructor() {
        this.simpleValue = 'simple value';
    }

    async doSomething(): Promise<string> {
        return 'value1';
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
});