/*
  Warnings:

  - You are about to drop the column `contentId` on the `content` table. All the data in the column will be lost.
  - Added the required column `notionId` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_contentId_fkey";

-- AlterTable
ALTER TABLE "content" DROP COLUMN "contentId",
ADD COLUMN     "notionId" TEXT NOT NULL,
ALTER COLUMN "check" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_notionId_fkey" FOREIGN KEY ("notionId") REFERENCES "notion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
