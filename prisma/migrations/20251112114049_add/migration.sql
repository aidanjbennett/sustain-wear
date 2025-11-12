-- CreateTable
CREATE TABLE "Donation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "colour" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
