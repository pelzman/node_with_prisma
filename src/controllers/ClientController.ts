import { Request, Response, NextFunction } from "express";
import ClientService from "../services/ClientService";
import config from "../utils/config";

class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }
  async getClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await this.clientService.handleGetAllClient();
      return res.status(config.HTTP_CODES.SUCCESS).json({
        status: config.HTTP_CODES.SUCCESS,
        message: config.RESPONSE_MESSAGES.CLIENT_FETCHED,
        data: clients,
      });
    } catch (error) {
      next(error);
      return res
        .status(config.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json("internal server error");
    }
  }
  async deleteClientsById(req: Request, res: Response, next: NextFunction) {
    try {
      const clientId = parseInt(req.params.id);
      const clients = await this.clientService.handleDeleteAllClientById(
        clientId
      );
      return res.status(config.HTTP_CODES.SUCCESS).json({
        status: config.HTTP_CODES.SUCCESS,
        message: config.RESPONSE_MESSAGES.CLIENT_FETCHED,
        data: clients,
      });
    } catch (error) {
      next(error);
      return res
        .status(config.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json("internal server error");
    }
  }
  async deleteClients(req: Request, res: Response, next: NextFunction) {
    try {
      await this.clientService.handleDeleteAllClient({});
      return res.status(config.HTTP_CODES.SUCCESS).json({
        status: config.HTTP_CODES.SUCCESS,
        message: "clients successfully deleted",
        data: null,
      });
    } catch (error) {
      next(error);
      return res
        .status(config.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json("internal server error");
    }
  }
}

export default ClientController;
