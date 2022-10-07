-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('CREATED', 'INPROGRESS', 'ONCHECK', 'FINISHED');

-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "stage" "Stage" NOT NULL DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "stage" "Stage" NOT NULL DEFAULT 'CREATED';
