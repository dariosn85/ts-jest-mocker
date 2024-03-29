import { Service } from './app/service';
import { mock, Mock } from 'ts-jest-mocker';
import { IRepository } from './app/repository';

describe('Class', () => {
    let service: Service;
    let repositoryMock: Mock<IRepository>;

    beforeEach(() => {
        repositoryMock = mock<IRepository>();
        repositoryMock.getBoolean.mockReturnValue(true);

        service = new Service(repositoryMock);
    });

    it('should do something', async () => {
        // repositoryMock.isInitialized.mockResolvedValueOnce('test'); // compilation error
        // repositoryMock.isInitialized.mockResolvedValueOnce(1); // compilation error
        repositoryMock.isInitialized.mockResolvedValueOnce(true); // no compilation error as method should return Promise<boolean>

        const result = await service.doSomething();

        expect(result).toBeTruthy();
    });
});
