import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IClientAttribute } from "../types/ClientType";
import ClientRespository from "../repositories/ClientRepository";
import { hash, compare } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import config from "../utils/config";

class AuthService {
  private clientRepository: ClientRespository;

  constructor() {
    this.clientRepository = new ClientRespository();
  }

  async signup(credential: IClientAttribute): Promise<IClientAttribute> {
    credential.password = await hash(credential.password, 10);
    try {
      return await this.clientRepository.create(credential);
    } catch (error) {
      throw error;
    }
  }

  async login(credential: { email: string; password: string }) {
    try {
      const client = await this.clientRepository.findByEmail(credential.email);
      if (!client) throw { message: config.RESPONSE_MESSAGES.CLIENT_NOT_FOUND };
      const isValidPassword = await compare(
        credential.password,
        client.password
      );
      if (!isValidPassword)
        throw { message: config.RESPONSE_MESSAGES.WRONG_PASSWORD };
      const accessToken = generateAccessToken(client);
      const refreshToken = generateRefreshToken(client);
      return { client, accessToken, refreshToken };
    } catch (error: any) {
      //handle known error
      if (error instanceof PrismaClientKnownRequestError) {
        throw {
          message: error.message,
          code: config.HTTP_CODES.BAD_REQUEST || 400,
        };
      }
      //handle generic errors
      throw {
        message: error.message,
        code: config.HTTP_CODES.INTERNAL_SERVER_ERROR || 500,
      };
    }
  }
}
export default AuthService;
