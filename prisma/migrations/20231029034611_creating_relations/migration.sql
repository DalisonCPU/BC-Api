/*
  Warnings:

  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `players_variables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "players";

-- DropTable
DROP TABLE "players_variables";

-- CreateTable
CREATE TABLE "Players" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "password" TEXT NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Players_variables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Players_vdata" (
    "playerId" INTEGER NOT NULL,
    "varId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Players_vdata_pkey" PRIMARY KEY ("playerId","varId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Players_id_key" ON "Players"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Players_name_key" ON "Players"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Players_variables_id_key" ON "Players_variables"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Players_variables_name_key" ON "Players_variables"("name");

-- AddForeignKey
ALTER TABLE "Players_vdata" ADD CONSTRAINT "Players_vdata_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Players_vdata" ADD CONSTRAINT "Players_vdata_varId_fkey" FOREIGN KEY ("varId") REFERENCES "Players_variables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
