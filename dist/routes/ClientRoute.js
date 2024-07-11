"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoute = void 0;
const express_1 = require("express");
const ClientController_1 = __importDefault(require("../controllers/ClientController"));
const authentication_1 = require("../utils/authentication");
const router = (0, express_1.Router)();
const clientController = new ClientController_1.default();
router.get("/clients", authentication_1.authentication.required, (req, res, next) => clientController.getClients(req, res, next));
router.delete("/clients/:id", authentication_1.authentication.required, (req, res, next) => clientController.deleteClientsById(req, res, next));
router.delete("/clients", authentication_1.authentication.required, (req, res, next) => clientController.deleteClients(req, res, next));
exports.clientRoute = router;
