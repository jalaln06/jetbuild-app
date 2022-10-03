-- DropIndex
DROP INDEX "Hashes_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT NOT NULL DEFAULT ' ';
