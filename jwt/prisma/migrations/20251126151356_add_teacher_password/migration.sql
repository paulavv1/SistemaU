/*
  Warnings:

  - Added the required column `password` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "password" TEXT NOT NULL;
