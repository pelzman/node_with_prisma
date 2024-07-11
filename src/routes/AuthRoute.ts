import { Request, Response, NextFunction } from "express";
import AuthController from "../controllers/AuthController";

import { Router } from "express";
import { authentication } from "../utils/authentication";

const router: Router = Router();
const authController = new AuthController();
router.post(
  "/register",  
  (req: Request, res: Response, next: NextFunction) =>
    authController.registerClient(req, res, next)
);
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    authController.loginClient(req, res, next)
);

export const authRouter: Router = router;
