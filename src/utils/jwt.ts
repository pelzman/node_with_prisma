import { Client } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./secrete";

const secret = JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateAccessToken = (client: Client): string => {
  try {
    return jwt.sign({ id: client.id, email: client.email }, secret, {
      expiresIn: "15m",
    });
  } catch (error:any) {
    throw new Error(`Failed to generate access token: ${error.message}`);
  }
};

export const generateRefreshToken = (client: Client): string => {
  try {
    return jwt.sign({ id: client.id, email: client.email }, secret, {
      expiresIn: "7d",
    });
  } catch (error:any) {
    throw new Error(`Failed to generate refresh token: ${error.message}`);
  }
};

export const verifyRefreshToken = (token: string): Client => {
  try {
    return jwt.verify(token, secret) as Client;
  } catch (error:any) {
    throw new Error(`Failed to verify refresh token: ${error.message}`);
  }
};