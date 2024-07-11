import { Request, Response, NextFunction, Router } from "express";
import ClientController from "../controllers/ClientController";
import { authentication } from "../utils/authentication";
const router: Router = Router();
const clientController = new ClientController();

router.get(
  "/clients",
  authentication.required,
  (req: Request, res: Response, next: NextFunction) =>
    clientController.getClients(req, res, next)
);
router.delete(
  "/clients/:id",
  authentication.required,
  (req: Request, res: Response, next: NextFunction) =>
    clientController.deleteClientsById(req, res, next)
);
router.delete(
  "/clients",
  authentication.required,
  (req: Request, res: Response, next: NextFunction) =>
    clientController.deleteClients(req, res, next)
);

export const clientRoute: Router = router;
