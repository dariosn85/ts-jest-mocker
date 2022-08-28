import {mock} from "../ts-jest-mocker";
import {UsersRepository} from "./users-repository";
import {UsersService} from "./users-service";

describe('UsersService', () => {
    it('should return all users', () => {
        // GIVEN
        const repositoryMock = mock(UsersRepository);
        repositoryMock.getUsers.mockReturnValue([{
            name: 'Mocked user 1',
            age: 40
        }]);
        const service = new UsersService(repositoryMock);

        // WHEN
        const users = service.getUsers();

        // THEN
        expect(users).toBeDefined();
        expect(users.length).toBe(1);
        expect(users[0]).toEqual({
            name: 'Mocked user 1',
            age: 40
        });
    });
});