-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "requestCount" DROP NOT NULL,
ALTER COLUMN "subscriptionStatus" DROP NOT NULL,
ALTER COLUMN "searchTokenBalance" DROP NOT NULL,
ALTER COLUMN "isDeleted" SET DEFAULT false;
