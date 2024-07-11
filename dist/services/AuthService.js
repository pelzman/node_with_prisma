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
const library_1 = require("@prisma/client/runtime/library");
const ClientRepository_1 = __importDefault(require("../repositories/ClientRepository"));
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("../utils/config"));
class AuthService {
    constructor() {
        this.clientRepository = new ClientRepository_1.default();
    }
    signup(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            credential.password = yield (0, bcrypt_1.hash)(credential.password, 10);
            try {
                return yield this.clientRepository.create(credential);
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.clientRepository.findByEmail(credential.email);
                if (!client)
                    throw { message: config_1.default.RESPONSE_MESSAGES.CLIENT_NOT_FOUND };
                const isValidPassword = yield (0, bcrypt_1.compare)(credential.password, client.password);
                if (!isValidPassword)
                    throw { message: config_1.default.RESPONSE_MESSAGES.WRONG_PASSWORD };
                const accessToken = (0, jwt_1.generateAccessToken)(client);
                const refreshToken = (0, jwt_1.generateRefreshToken)(client);
                return { client, accessToken, refreshToken };
            }
            catch (error) {
                //handle known error
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    throw {
                        message: error.message,
                        code: config_1.default.HTTP_CODES.BAD_REQUEST || 400,
                    };
                }
                //handle generic errors
                throw {
                    message: error.message,
                    code: config_1.default.HTTP_CODES.INTERNAL_SERVER_ERROR || 500,
                };
            }
        });
    }
}
exports.default = AuthService;
