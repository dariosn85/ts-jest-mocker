import {User, UsersRepository} from "./users-repository";

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {
    }

    getUsers(): Array<User> {
        return this.usersRepository.getUsers();
    }
}