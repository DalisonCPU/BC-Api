/*
  Warnings:

  - You are about to drop the `Players` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Players_variables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Players_vdata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Players_vdata" DROP CONSTRAINT "Players_vdata_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Players_vdata" DROP CONSTRAINT "Players_vdata_varId_fkey";

-- DropTable
DROP TABLE "Players";

-- DropTable
DROP TABLE "Players_variables";

-- DropTable
DROP TABLE "Players_vdata";

-- CreateTable
CREATE TABLE "Account" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL DEFAULT 0,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerVariable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayerVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerData" (
    "player_id" INTEGER NOT NULL,
    "variable_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "PlayerData_pkey" PRIMARY KEY ("player_id","variable_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerData" ADD CONSTRAINT "PlayerData_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerData" ADD CONSTRAINT "PlayerData_variable_id_fkey" FOREIGN KEY ("variable_id") REFERENCES "PlayerVariable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
