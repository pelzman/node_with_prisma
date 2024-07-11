import express, { Request, Response } from "express";
import logger  from "morgan"
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { MainRoutes } from "./routes";
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.APP_PORT;
app.use(express.json());
app.use(logger('dev'))

app.use("/api/v1",MainRoutes )
async function main() {
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.client.findMany()
    console.log(allUsers)
  }

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

export default prisma ;
