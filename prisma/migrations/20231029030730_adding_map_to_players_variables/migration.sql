/*
  Warnings:

  - You are about to drop the `Players_variables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Players_variables";

-- CreateTable
CREATE TABLE "players_variables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "players_variables_id_key" ON "players_variables"("id");

-- CreateIndex
CREATE UNIQUE INDEX "players_variables_name_key" ON "players_variables"("name");
