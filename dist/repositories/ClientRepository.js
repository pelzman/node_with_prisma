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
const BaseReoisitory_1 = __importDefault(require("./BaseReoisitory"));
class ClientRespository extends BaseReoisitory_1.default {
    constructor() {
        const prisma = new client_1.PrismaClient();
        super(prisma.client);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findUnique({ where: { email } });
        });
    }
    findClientById(ClientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findById({ id: ClientId });
        });
    }
    updatePassword(clientId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update({
                where: { id: clientId },
                data: { password: newPassword },
            });
        });
    }
    getAllClient() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findMany({});
        });
    }
    deleteClientById(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.deleteOne({ id: clientId });
        });
    }
    deleteAllClient(_a) {
        return __awaiter(this, arguments, void 0, function* ({}) {
            return this.deleteMany({});
        });
    }
}
exports.default = ClientRespository;
