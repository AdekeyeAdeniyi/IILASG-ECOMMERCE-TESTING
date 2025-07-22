/*
  Warnings:

  - The values [PRE_ORDER] on the enum `AvailabilityStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AvailabilityStatus_new" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'LIMITED_STOCK');
ALTER TABLE "Product" ALTER COLUMN "availability" TYPE "AvailabilityStatus_new" USING ("availability"::text::"AvailabilityStatus_new");
ALTER TYPE "AvailabilityStatus" RENAME TO "AvailabilityStatus_old";
ALTER TYPE "AvailabilityStatus_new" RENAME TO "AvailabilityStatus";
DROP TYPE "AvailabilityStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ProductStatus";

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "quantity" INTEGER NOT NULL,
    "color" TEXT,
    "size" TEXT,
    "imageUrl" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
