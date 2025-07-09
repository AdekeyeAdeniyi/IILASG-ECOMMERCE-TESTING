/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `RefreshTokenSession` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `RefreshTokenSession` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `RefreshTokenSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RefreshTokenSession" DROP COLUMN "hashedToken",
DROP COLUMN "ipAddress",
DROP COLUMN "userAgent";
