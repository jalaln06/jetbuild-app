-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Hashes" (
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hashes_email_key" ON "Hashes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hashes_hash_key" ON "Hashes"("hash");
