import { Socket } from "socket.io";
import { io } from "../http";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";
import { ConnectionsService } from "./../services/ConnectionsService";

io.on("connect", (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("clientFirstAccess", async (params) => {
    /* salvar conexão aberta com socketId e userId */
    const socketId = socket.id;
    const { text, email } = params;
    let userId = null;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socketId,
        userId: user.id,
      });
      userId = user.id;
    } else {
      userId = userExists.id;
      const connection = await connectionsService.findByUserId(userExists.id);

      if (!connection) {
        await connectionsService.create({
          socketId,
          userId: userExists.id,
        });
      } else {
        connection.socketId = socketId;

        await connectionsService.create(connection);
      }
    }

    await messagesService.create({
      text,
      userId,
    });
  });
});
