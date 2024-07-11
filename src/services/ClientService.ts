import { PrismaClient, Prisma, Client } from "@prisma/client";
import ClientRespository from "../repositories/ClientRepository";
import config from "../utils/config";

class ClientService {
  private clientRepository: ClientRespository;
  protected prisma: PrismaClient;
  constructor() {
    this.clientRepository = new ClientRespository();
    this.prisma = new PrismaClient();
  }

  async handleGetAllClient() {
    try {
      const client = await this.clientRepository.getAllClient();
      if (!client) throw new Error("unable to fecth clients");
      return client;
    } catch (error: any) {
      throw new Error("Something went wrong from the server" || 500);
    }
  }

  async handleDeleteAllClientById(clientId: number): Promise<Client | null> {
    try {
      const clientExist = await this.clientRepository.findById({
        id: clientId,
      });
      if (!clientExist) throw new Error("Client not found");
      const client = await this.clientRepository.deleteClientById(clientId);
      return client;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async handleDeleteAllClient({}) {
    try {
      await this.clientRepository.deleteMany({});
      // Reset the sequence for the 'client' table
     
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export default ClientService;
