/*
  Warnings:

  - You are about to drop the column `fk_account` on the `tbl_player` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `tbl_player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_player" DROP CONSTRAINT "tbl_player_fk_account_fkey";

-- AlterTable
ALTER TABLE "tbl_player" DROP COLUMN "fk_account",
ADD COLUMN     "account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_player" ADD CONSTRAINT "tbl_player_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "tbl_account"("email") ON DELETE CASCADE ON UPDATE CASCADE;
