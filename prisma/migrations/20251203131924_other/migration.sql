-- AlterTable
ALTER TABLE "Donation" ADD COLUMN "charityStaffMemberId" TEXT;
ALTER TABLE "Donation" ADD COLUMN "processedAt" DATETIME;
ALTER TABLE "Donation" ADD COLUMN "rejectionReason" TEXT;
