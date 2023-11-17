/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tbl_playervariable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tbl_playervariable_name_key" ON "tbl_playervariable"("name");
