"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Joi = __importStar(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
};
class Validate {
    validateClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const validated = Joi.object({
                name: Joi.string().min(5).max(30),
                email: Joi.string().required().email().description("email is required"),
                password: (0, joi_password_complexity_1.default)(complexityOptions).description("require atleast 5 characters, one lowercase, one uppercase, one number, and one symbol"),
                phone: Joi.string().max(11),
                address: Joi.string().required().description('address is required'),
                requestCount: Joi.number(),
                status: Joi.boolean(),
                subscriptionStatus: Joi.boolean(),
                searchTokenBalance: Joi.number(),
                subscriptionStartDate: Joi.date(),
                subscriptionExpiresOn: Joi.date(),
                subscriptionDuration: Joi.date(),
                isDeleted: Joi.boolean(),
            });
            return validated.validate(client);
        });
    }
    validateLoginClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const validated = Joi.object({
                email: Joi.string().required().email().description("email is required"),
                password: (0, joi_password_complexity_1.default)(complexityOptions).description("require atleast 5 characters, one lowercase, one uppercase, one number, and one symbol"),
            });
            return validated.validate(client);
        });
    }
}
exports.default = Validate;
