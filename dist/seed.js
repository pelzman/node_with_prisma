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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function clientData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Delete all records from the table
        yield prisma.client.deleteMany({});
        // Reset the sequence for the 'client' table
        yield prisma.$executeRaw `ALTER SEQUENCE client_id_seq RESTART WITH 1`;
        const hashedPassword = yield bcrypt_1.default.hash("Password123@", 10);
        const seedData = [
            {
                email: "john.doe@example.com",
                name: "John Doe",
                phone: "1234567890",
                password: hashedPassword,
                address: "123 Main St",
                requestCount: 0,
                status: 1,
                subscriptionStatus: 1,
                searchTokenBalance: 100,
                isDeleted: false,
                subscriptionStartDate: new Date(),
                subscriptionExpiresOn: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                subscriptionDuration: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            },
        ];
        for (const clientData of seedData) {
            yield prisma.client.create({
                data: clientData,
            });
            console.log(`created client with id:${clientData}`);
        }
    });
}
clientData();
