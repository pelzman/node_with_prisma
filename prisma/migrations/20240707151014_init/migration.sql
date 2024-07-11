-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "subscriptionStartDate" DROP NOT NULL,
ALTER COLUMN "subscriptionExpiresOn" DROP NOT NULL,
ALTER COLUMN "subscriptionDuration" DROP NOT NULL;
