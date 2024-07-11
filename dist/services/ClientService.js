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
const client_1 = require("@prisma/client");
const ClientRepository_1 = __importDefault(require("../repositories/ClientRepository"));
class ClientService {
    constructor() {
        this.clientRepository = new ClientRepository_1.default();
        this.prisma = new client_1.PrismaClient();
    }
    handleGetAllClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.clientRepository.getAllClient();
                if (!client)
                    throw new Error("unable to fecth clients");
                return client;
            }
            catch (error) {
                throw new Error("Something went wrong from the server" || 500);
            }
        });
    }
    handleDeleteAllClientById(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientExist = yield this.clientRepository.findById({
                    id: clientId,
                });
                if (!clientExist)
                    throw new Error("Client not found");
                const client = yield this.clientRepository.deleteClientById(clientId);
                return client;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    handleDeleteAllClient(_a) {
        return __awaiter(this, arguments, void 0, function* ({}) {
            try {
                yield this.clientRepository.deleteMany({});
                // Reset the sequence for the 'client' table
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = ClientService;
