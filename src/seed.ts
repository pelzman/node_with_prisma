import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function clientData() {
  const hashedPassword = await bcrypt.hash("Password123@", 10);

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
      subscriptionExpiresOn: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
      subscriptionDuration: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
    },
  ];

  for (const clientData of seedData) {
    await prisma.client.create({
      data: clientData,
    });
    console.log(`created client with id:${clientData}`);
  }
}

clientData();
