import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  adminId?: string;
  text: string;
  userId: string;
}

export class MessagesService {
  async create({ adminId, text, userId }: IMessageCreate) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({
      adminId,
      text,
      userId,
    });

    await messagesRepository.save(message);

    return message;
  }

  async listByUser(userId: string) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const list = await messagesRepository.find({
      where: { userId },
      relations: ["user"],
    });

    return list;
  }
}
