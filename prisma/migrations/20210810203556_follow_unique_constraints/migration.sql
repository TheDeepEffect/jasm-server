/*
  Warnings:

  - A unique constraint covering the columns `[followBy,followTo]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follow.followBy_followTo_unique" ON "Follow"("followBy", "followTo");
