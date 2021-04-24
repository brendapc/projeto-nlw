import { getCustomRepository } from "typeorm";
import { MessageRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  adminId?: string;
  text: string;
  userId: string;
}

export class MessageService {
  async create({ adminId, text, userId }: IMessageCreate) {
    const messagesRepository = getCustomRepository(MessageRepository);

    const message = messagesRepository.create({
      adminId,
      text,
      userId,
    });

    await messagesRepository.save(message);

    return message;
  }
}
