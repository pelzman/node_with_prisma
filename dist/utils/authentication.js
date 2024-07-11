"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const express_jwt_1 = require("express-jwt");
const secrete_1 = require("./secrete");
if (!secrete_1.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const getTokenFromHeader = (req) => {
    try {
        const headerAuth = req.headers.authorization;
        if (!headerAuth) {
            console.warn("Authorization header is missing");
            return undefined;
        }
        if (Array.isArray(headerAuth)) {
            return splitToken(headerAuth[0]);
        }
        else {
            return splitToken(headerAuth);
        }
    }
    catch (error) {
        console.error(`Error extracting token from header: ${error.message}`);
        return undefined;
    }
};
function splitToken(authString) {
    try {
        const parts = authString.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            return parts[1];
        }
        else {
            console.warn("Authorization header format is invalid");
            return undefined;
        }
    }
    catch (error) {
        console.error(`Error splitting token: ${error.message}`);
        return undefined;
    }
}
const handleJwtErrors = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        if (err.inner && err.inner.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
    next(err);
};
const auth = {
    required: [
        (0, express_jwt_1.expressjwt)({
            credentialsRequired: true,
            secret: secrete_1.JWT_SECRET,
            getToken: getTokenFromHeader,
            algorithms: ['HS256']
        }),
        handleJwtErrors
    ],
    optional: [(0, express_jwt_1.expressjwt)({
            credentialsRequired: false,
            secret: secrete_1.JWT_SECRET,
            getToken: getTokenFromHeader,
            algorithms: ['HS256']
        }),
        handleJwtErrors
    ]
};
exports.authentication = auth;
