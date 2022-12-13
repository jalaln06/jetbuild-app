-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_pointId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_companyId_fkey";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;
