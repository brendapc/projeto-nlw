import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { Message } from "./../entities/Message";

interface IMessageCreate {
  adminId?: string;
  text: string;
  userId: string;
}

export class MessagesService {
  private _messagesRepository: Repository<Message>;
  constructor() {
    this._messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ adminId, text, userId }: IMessageCreate) {
    const message = this._messagesRepository.create({
      adminId,
      text,
      userId,
    });

    await this._messagesRepository.save(message);

    return message;
  }

  async listByUser(userId: string) {
    const list = await this._messagesRepository.find({
      where: { userId },
      relations: ["user"],
    });

    return list;
  }
}
