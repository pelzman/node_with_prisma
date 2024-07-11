"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const authController = new AuthController_1.default();
router.post("/register", (req, res, next) => authController.registerClient(req, res, next));
router.post("/login", (req, res, next) => authController.loginClient(req, res, next));
exports.authRouter = router;
