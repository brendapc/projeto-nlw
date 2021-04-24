import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

export class SettingsService {
  private _settingsRepository: Repository<Setting>;
  constructor() {
    this._settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this._settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) throw new Error("User already exists");

    const settings = this._settingsRepository.create({
      chat,
      username,
    });

    await this._settingsRepository.save(settings);
  }
}
