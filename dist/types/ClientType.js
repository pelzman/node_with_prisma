"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSelect = void 0;
const client_1 = require("@prisma/client");
exports.clientSelect = client_1.Prisma.validator()({
    id: true,
    name: true,
    email: true,
    password: true,
    phone: true,
    address: true,
    requestCount: true,
    status: true,
    subscriptionStatus: true,
    searchTokenBalance: true,
    subscriptionStartDate: true,
    subscriptionExpiresOn: true,
    subscriptionDuration: true,
    isDeleted: true,
});
