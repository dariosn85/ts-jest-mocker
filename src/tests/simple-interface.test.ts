import { mock } from 'ts-jest-mocker';

interface SimpleInterface {
    doSomething(): Promise<string>;
}

class SimpleService {
    constructor(private readonly repository: SimpleInterface) {}

    doSomething(): Promise<string> {
        return this.repository.doSomething();
    }
}

describe('Simple service', () => {
    it('should ', async () => {
        // GIVEN
        const repository = mock<SimpleInterface>();
        const service = new SimpleService(repository);

        repository.doSomething.mockResolvedValueOnce('mocked-value');

        // WHEN
        const value = await service.doSomething();

        // THEN
        expect(repository.doSomething).toHaveBeenCalledTimes(1);
        expect(value).toBe('mocked-value');
    });
});
