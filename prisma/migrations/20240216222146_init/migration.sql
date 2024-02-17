-- AlterTable
ALTER TABLE "notion" ALTER COLUMN "status" DROP NOT NULL;

-- CreateTable
CREATE TABLE "content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "check" BOOLEAN NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "notion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
