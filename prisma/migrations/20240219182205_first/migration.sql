-- CreateEnum
CREATE TYPE "NotionStatus" AS ENUM ('BACKLOG', 'PENDING', 'RUNNING', 'REVIEW', 'DONE');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGHT', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "notion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotionStatus" DEFAULT 'BACKLOG',
    "term" TIMESTAMP(3),
    "priority" "Priority" DEFAULT 'LOW',
    "company" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "notion_pkey" PRIMARY KEY ("id")
);

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
