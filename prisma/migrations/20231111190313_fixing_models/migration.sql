/*
  Warnings:

  - You are about to drop the column `account_id` on the `Player` table. All the data in the column will be lost.
  - Added the required column `fk_account` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_account_id_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "account_id",
ADD COLUMN     "fk_account" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_fk_account_fkey" FOREIGN KEY ("fk_account") REFERENCES "Account"("email") ON DELETE CASCADE ON UPDATE CASCADE;
