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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const config_1 = __importDefault(require("../utils/config"));
const validation_1 = __importDefault(require("../utils/validation"));
class AuthController {
    constructor() {
        this.authService = new AuthService_1.default();
        this.validate = new validation_1.default();
    }
    registerClient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //validate the reqauest body
                const { error } = yield this.validate.validateClient(req.body);
                if (error) {
                    return res.status(config_1.default.HTTP_CODES.BAD_REQUEST).json({
                        status: config_1.default.HTTP_CODES.BAD_REQUEST,
                        message: error.details[0].message,
                    });
                }
                const client = yield this.authService.signup(req.body);
                return res.status(config_1.default.HTTP_CODES.CREATED).json({
                    status: config_1.default.HTTP_CODES.CREATED,
                    message: config_1.default.RESPONSE_MESSAGES.CLIENT_CREATED,
                    data: client,
                });
            }
            catch (error) {
                next(error);
                return res.status(500).json("internal server error");
            }
        });
    }
    loginClient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //validate the redq.body 
                const client = yield this.authService.login(req.body);
                return res.status(config_1.default.HTTP_CODES.SUCCESS).json({
                    status: config_1.default.HTTP_CODES.SUCCESS,
                    message: config_1.default.RESPONSE_MESSAGES.CLIENT_LOGIN,
                    data: client,
                });
            }
            catch (error) {
                next(error);
                return res.status(500).json("invalid credentials");
            }
        });
    }
}
exports.default = AuthController;
