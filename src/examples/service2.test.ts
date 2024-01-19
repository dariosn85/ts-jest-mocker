import { mock, Mock } from 'ts-jest-mocker';
import { Repository } from './app/repository';
import { Service2 } from './app/service2';

describe('Class', () => {
    let service: Service2;
    let repositoryMock: Mock<Repository>;

    beforeEach(() => {
        repositoryMock = mock(Repository);
        repositoryMock.getBoolean.mockReturnValue(true);

        service = new Service2(repositoryMock);
    });

    it('should do something', async () => {
        // repositoryMock.getString.mockReturnValue(true); // compilation error
        // repositoryMock.getString.mockReturnValue(1); // compilation error
        repositoryMock.getString.mockReturnValue('Test string'); // no compilation error as method should return string
        repositoryMock.xyz = '123';

        const result = service.doSomething();

        expect(result).toBeTruthy();
    });
});
