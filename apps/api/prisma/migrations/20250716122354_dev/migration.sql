/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_vendorId_fkey";

-- DropIndex
DROP INDEX "Category_name_vendorId_key";

-- DropIndex
DROP INDEX "Product_vendorId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "vendorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "vendorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_userId_key" ON "Category"("name", "userId");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
