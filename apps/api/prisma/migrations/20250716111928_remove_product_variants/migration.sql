/*
  Warnings:

  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropTable
DROP TABLE "ProductVariant";
