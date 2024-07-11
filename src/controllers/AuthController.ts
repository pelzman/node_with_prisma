import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import config from "../utils/config";
import Validate from "../utils/validation";

class AuthController {
  private authService: AuthService;
  private validate: Validate;
  constructor() {
    this.authService = new AuthService();
    this.validate = new Validate();
  }

  async registerClient(req: Request, res: Response, next: NextFunction) {
    try {
      //validate the reqauest body
      const { error } = await this.validate.validateClient(req.body);
      if (error) {
        return res.status(config.HTTP_CODES.BAD_REQUEST).json({
          status: config.HTTP_CODES.BAD_REQUEST,
          message: error.details[0].message,
        });
      }

      const client = await this.authService.signup(req.body);

      return res.status(config.HTTP_CODES.CREATED).json({
        status: config.HTTP_CODES.CREATED,
        message: config.RESPONSE_MESSAGES.CLIENT_CREATED,
        data: client,
      });
    } catch (error) {
      next(error);
      return res.status(500).json("internal server error");
    }
  }

  async loginClient(req: Request, res: Response, next: NextFunction) {    
    try { 
       //validate the redq.body 
    
      const client = await this.authService.login(req.body);
      return res.status(config.HTTP_CODES.SUCCESS).json({
        status: config.HTTP_CODES.SUCCESS,
        message: config.RESPONSE_MESSAGES.CLIENT_LOGIN,
        data: client,
      });
    } catch (error) {
      next(error);
      return res.status(500).json("invalid credentials");
    }
  }
}

export default AuthController;
