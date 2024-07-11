-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "packageName" TEXT NOT NULL,
    "searchTokenLimit" INTEGER NOT NULL,
    "durationLimit" INTEGER NOT NULL,
    "durationInMonths" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "requestCount" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "subscriptionStatus" INTEGER NOT NULL,
    "searchTokenBalance" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "subscriptionStartDate" TIMESTAMP(3) NOT NULL,
    "subscriptionExpiresOn" TIMESTAMP(3) NOT NULL,
    "subscriptionDuration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_clientId_key" ON "Subscription"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
