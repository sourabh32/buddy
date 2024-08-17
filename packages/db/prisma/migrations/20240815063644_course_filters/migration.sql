-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseType" TEXT NOT NULL DEFAULT 'self-paced',
ADD COLUMN     "isLive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'hindi';
