<h1>ts-jest-mocker</h1>

Powerful, lightweight, TypeScript-friendly and 100% [Jest](https://github.com/facebook/jest#readme) API compatible library
which simplifies mocking of classes and interfaces.

[![npm version](https://badge.fury.io/js/ts-jest-mocker.svg)](https://badge.fury.io/js/ts-jest-mocker)
[![Build](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/build.yml/badge.svg)](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/build.yml)
[![Tests](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/test.yml/badge.svg)](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/test.yml)
[![Publish](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/npm-publish.yml)

***

## Table of Contents

- [Getting started](#getting-started)
    - [Mocking classes](#mocking-classes)
    - [Mocking interfaces](#mocking-interfaces)
- [More advanced example](#more-advanced-example)
- [Jest API compatibility](#jest-api-compatibility)
- [Why to use ts-jest-mocker](#why-to-use-ts-jest-mocker)

***

## Getting started

Install ts-jest-mocker using [`npm`](https://www.npmjs.com/package/ts-jest-mocker):

```bash
npm install --save-dev ts-jest-mocker
```

### Mocking classes

```typescript
const serviceMock = mock(YourService); // automatically mocks all methods

serviceMock.yourMethod.mockReturnValue('Test');
```

### Mocking interfaces

```typescript
const interfaceMock = mock<YourInterface>(); // automatically mocks all interface methods

interfaceMock.yourMethod.mockReturnValue('Test');
```

## More advanced example

As an example let's create service `UserService` used for managing your application users.
This service has dependency to `UsersRepository` which is used to load users from your database.

`users-repository.ts` file:

```typescript
export interface User {
    name: string
    age: number;
}

export class UsersRepository {
    getUsers(): Array<User> {
        return [
            {
                name: 'User1',
                age: 30
            }, {
                name: 'User2',
                age: 40
            }
        ]
    }
}
```

`users-service.ts` file:

```typescript
import {User, UsersRepository} from "./users-repository";

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {
    }

    getUsers(): Array<User> {
        return this.usersRepository.getUsers();
    }
}
```

Now let's create file `users-service.test.ts` and write some unit tests using ts-jest-mocker.
We will mock `UsersRepository` using `mock()` function. All repository methods will be mocked
automatically using `jest.fn()` internally and all type-checking will work out-of-the-box.

`users-service.test.ts` file:

```typescript
import {mock} from "ts-jest-mocker";
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
```

## Jest API compatibility

ts-jest-mocker is not an alternative to Jest and does not provide an alternative API. It is utility
which main purpose is to add additional capability on top of Jest to simplify writing mocks and
keep all the benefits of typing.

## Why to use ts-jest-mocker

| :white_check_mark: Do this |
|----------------------------|
| ```typescript```           |

| :x: Don't do this |
|-------------------|
| test              |