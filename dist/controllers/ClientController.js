"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientService_1 = __importDefault(require("../services/ClientService"));
const config_1 = __importDefault(require("../utils/config"));
class ClientController {
    constructor() {
        this.clientService = new ClientService_1.default();
    }
    getClients(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield this.clientService.handleGetAllClient();
                return res.status(config_1.default.HTTP_CODES.SUCCESS).json({
                    status: config_1.default.HTTP_CODES.SUCCESS,
                    message: config_1.default.RESPONSE_MESSAGES.CLIENT_FETCHED,
                    data: clients,
                });
            }
            catch (error) {
                next(error);
                return res
                    .status(config_1.default.HTTP_CODES.INTERNAL_SERVER_ERROR)
                    .json("internal server error");
            }
        });
    }
    deleteClientsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientId = parseInt(req.params.id);
                const clients = yield this.clientService.handleDeleteAllClientById(clientId);
                return res.status(config_1.default.HTTP_CODES.SUCCESS).json({
                    status: config_1.default.HTTP_CODES.SUCCESS,
                    message: config_1.default.RESPONSE_MESSAGES.CLIENT_FETCHED,
                    data: clients,
                });
            }
            catch (error) {
                next(error);
                return res
                    .status(config_1.default.HTTP_CODES.INTERNAL_SERVER_ERROR)
                    .json("internal server error");
            }
        });
    }
    deleteClients(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.clientService.handleDeleteAllClient({});
                return res.status(config_1.default.HTTP_CODES.SUCCESS).json({
                    status: config_1.default.HTTP_CODES.SUCCESS,
                    message: "clients successfully deleted",
                    data: null,
                });
            }
            catch (error) {
                next(error);
                return res
                    .status(config_1.default.HTTP_CODES.INTERNAL_SERVER_ERROR)
                    .json("internal server error");
            }
        });
    }
}
exports.default = ClientController;
