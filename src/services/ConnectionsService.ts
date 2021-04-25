import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "./../entities/Connection";
import { ConnectionsRepository } from "./../repositories/ConnectionsRepository";

interface IConnectionCreate {
  socketId: string;
  userId: string;
  adminId?: string;
  id?: string;
}

export class ConnectionsService {
  private _connectionsRepository: Repository<Connection>;
  constructor() {
    this._connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({
    socketId,
    userId,
    adminId,
    id,
  }: IConnectionCreate) {
    const connection = this._connectionsRepository.create({
      socketId,
      userId,
      adminId,
      id,
    });

    await this._connectionsRepository.save(connection);

    return connection;
  }
}
