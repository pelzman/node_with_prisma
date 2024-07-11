"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrete_1 = require("./secrete");
const secret = secrete_1.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET is not defined");
}
const generateAccessToken = (client) => {
    try {
        return jsonwebtoken_1.default.sign({ id: client.id, email: client.email }, secret, {
            expiresIn: "15m",
        });
    }
    catch (error) {
        throw new Error(`Failed to generate access token: ${error.message}`);
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (client) => {
    try {
        return jsonwebtoken_1.default.sign({ id: client.id, email: client.email }, secret, {
            expiresIn: "7d",
        });
    }
    catch (error) {
        throw new Error(`Failed to generate refresh token: ${error.message}`);
    }
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new Error(`Failed to verify refresh token: ${error.message}`);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
