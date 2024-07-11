import { PrismaClient, Client, Prisma } from "@prisma/client";
import BaseRepository from "./BaseReoisitory";

class ClientRespository extends BaseRepository<
  Client,
  Prisma.ClientCreateInput,
  Prisma.ClientUpdateInput,
  Prisma.ClientWhereInput,
  Prisma.ClientWhereUniqueInput
> {
  constructor() {
    const prisma = new PrismaClient();
    super(prisma.client);
  }

  async findByEmail(email: string): Promise<Client | null> {
    return await this.model.findUnique({ where: { email } });
  }
  async findClientById(ClientId: number): Promise<Client | null> {
    return await this.findById( {id:ClientId}   );
  }

  async updatePassword(clientId: number, newPassword: string): Promise<Client> {
    return await this.model.update({
      where: { id: clientId },
      data: { password: newPassword },
    });
  }
  async getAllClient(): Promise<Client[]> {
    return this.model.findMany({});
  }
  async deleteClientById(clientId: number): Promise<Client | null> {
    return await this.deleteOne({id:clientId})
  }
  async deleteAllClient({}): Promise<void> {
    return this.deleteMany({});
  }
}

export default ClientRespository;
