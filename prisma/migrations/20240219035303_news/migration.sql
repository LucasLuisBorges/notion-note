/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGHT', 'MEDIUM', 'LOW');

-- DropForeignKey
ALTER TABLE "notion" DROP CONSTRAINT "notion_userId_fkey";

-- AlterTable
ALTER TABLE "notion" ADD COLUMN     "company" TEXT,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW';

-- DropTable
DROP TABLE "user";
