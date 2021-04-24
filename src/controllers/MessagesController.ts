import { Request, Response } from "express";
import { MessageService } from "../services/MessagesService";

export class MessagesController {
  async create(request: Request, response: Response) {
    const { adminId, text, userId } = request.body;
    const messageService = new MessageService();

    const message = await messageService.create({
      adminId,
      text,
      userId,
    });
    return response.json(message);
  }
}
