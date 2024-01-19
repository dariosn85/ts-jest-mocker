<h1>ts-jest-mocker</h1>

Powerful, lightweight, TypeScript-friendly and 100% [Jest](https://github.com/facebook/jest#readme) API compatible library
which simplifies classes and interfaces mocking.

[![npm version](https://badge.fury.io/js/ts-jest-mocker.svg)](https://badge.fury.io/js/ts-jest-mocker)
[![Build](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/build.yml/badge.svg)](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/build.yml)
[![Tests](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/test.yml/badge.svg)](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/test.yml)
[![Publish](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dariosn85/ts-jest-mocker/actions/workflows/npm-publish.yml)

---

## Table of Contents

-   [Getting started](#getting-started)
    -   [Mocking classes](#mocking-classes)
    -   [Mocking interfaces](#mocking-interfaces)
-   [More advanced example](#more-advanced-example)
-   [Jest API compatibility](#jest-api-compatibility)
-   [Why to use ts-jest-mocker](#why-to-use-ts-jest-mocker)

---

## Getting started

Install ts-jest-mocker using [`npm`](https://www.npmjs.com/package/ts-jest-mocker):

```bash
npm install --save-dev ts-jest-mocker
```

### Mocking classes

```typescript
import { mock } from 'ts-jest-mocker';

const serviceMock = mock(YourService); // automatically mocks all methods

serviceMock.yourMethod.mockReturnValue('Test');
```

### Mocking interfaces

```typescript
import { mock } from 'ts-jest-mocker';

const interfaceMock = mock<YourInterface>(); // automatically mocks all interface methods

interfaceMock.yourMethod.mockReturnValue('Test');
```

### Using `Mock` type

```typescript
import { Mock, mock } from 'ts-jest-mocker';

let serviceMock: Mock<YourService>;

serviceMock = mock(YourService);

serviceMock.yourMethod.mockReturnValue('Test');
```

## More advanced example

As an example let's create service `UserService` used for managing your application users.
This service has dependency to `UsersRepository` which is used to load users from your database.

`users-repository.ts` file:

```typescript title="users-repository.ts"
export interface User {
    name: string;
    age: number;
}

export class UsersRepository {
    getUsers(): Array<User> {
        return [
            {
                name: 'User1',
                age: 30,
            },
            {
                name: 'User2',
                age: 40,
            },
        ];
    }
}
```

`users-service.ts` file:

```typescript title="users-service.ts"
import { User, UsersRepository } from './users-repository';

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    getUsers(): Array<User> {
        return this.usersRepository.getUsers();
    }
}
```

Now let's create file `users-service.test.ts` and write some unit tests using ts-jest-mocker.
We will mock `UsersRepository` using `mock()` function. All repository methods will be mocked
automatically using `jest.fn()` internally and all type-checking will work out-of-the-box.

`users-service.test.ts` file:

```typescript title="users-service.test.ts"
import { mock } from 'ts-jest-mocker';
import { UsersRepository } from './users-repository';
import { UsersService } from './users-service';

describe('UsersService', () => {
    it('should return all users', () => {
        // GIVEN
        const repositoryMock = mock(UsersRepository);
        repositoryMock.getUsers.mockReturnValue([
            {
                name: 'Mocked user 1',
                age: 40,
            },
        ]);
        const service = new UsersService(repositoryMock);

        // WHEN
        const users = service.getUsers();

        // THEN
        expect(users).toBeDefined();
        expect(users.length).toBe(1);
        expect(users[0]).toEqual({
            name: 'Mocked user 1',
            age: 40,
        });
    });
});
```

## Jest API compatibility

ts-jest-mocker is not an alternative to Jest and does not provide an alternative API. It is utility
which main purpose is to add additional capability on top of Jest to simplify writing mocks and
keep all the benefits of data types.

While using ts-jest-mocker you don't need to use any custom calls to reset mock or anything.
You call for example `jest.resetAllMocks()` as you usually do.

## Why to use ts-jest-mocker?

Do you often catch yourself writing mocks manually using `jest.fn()`? Do you maybe omit defining
`jest.Mock` type generics and implicitly end up using `any`, or what's worse, you need to explicitly
convert your mocks to `any` to be able to use them with classes under test? It is hard to do refactoring
and keeping unit tests up-to-date?

The above :point_up_2: sounds familiar to you? Stop doing that! ts-jest-mocker will help you do that!

#### ❌ Don'ts

```typescript
const mockUserRepository = {
    yourMethod1: jest.fn(),
    yourMethod2: jest.fn(),
    yourMethod3: jest.fn(),
    yourMethod4: jest.fn(),
    yourMethod5: jest.fn(),
    yourMethod6: jest.fn(),

    // ...

    // ❌️ you have to mock all the methods
    // so mock and UsersRepository are compatible?
    yourMethod20: jest.fn(),
};

const userService = new UserService(mockUserRepository);
```

```typescript
const mockUserRepository = {
    yourMethod1: jest.fn(),
    yourMethod2: jest.fn(),
} as any;
// ❌ you mock only what you need and then cast explicitly to any
// and loose benefits from compilation phase?

const userService = new UserService(mockUserRepository);
```

```typescript
const mockUserRepository = {
    yourMethod1: jest.fn(),
};

// ❌️ You often skip specifying mock types like jest.fn<User, [User]>() and
// then need to check over and over again in the code what actually
// mocked methods should return?
mockUserRepository.yourMethod1.mockReturnedValue({
    name: 'User1',
    age: 20,
});

const userService = new UserService(mockUserRepository as any);
```

#### ✅ Do's

```typescript
// ✅ simply use mock() function and ts-jest-mocker will
// provide mocks for all the methods for you
const mockUserRepository = mock(UsersRepository);

mockUserRepository.yourMethod1.mockReturnedValue({
    name: 'User1',
    age: 20,
}); // ✅ return type is automatically checked while compilation

mockUserRepository.yourMethod1.mockReturnedValue({
    name: 'User1',
}); // ❗ [compilation error] - you will catch incorrect types

mockUserRepository.yourMethod1.mockReturnedValue({
    age: 20,
}); // ❗ [compilation error] - you will catch incorrect types

// ❗ [compilation error] - you will catch incorrect types
mockUserRepository.yourMethod1.mockReturnedValue(true);

const userService = new UserService(mockUserRepository);
```
