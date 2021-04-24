import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "./../repositories/UsersRepository";

export class UsersService {
  private _usersRepository: Repository<User>;
  constructor() {
    this._usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    const userExists = await this._usersRepository.findOne({
      email,
    });

    if (userExists) return userExists;

    const user = this._usersRepository.create({
      email,
    });

    await this._usersRepository.save(user);

    return user;
  }
}
