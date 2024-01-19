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
