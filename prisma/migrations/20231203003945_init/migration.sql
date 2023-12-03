-- AlterTable
ALTER TABLE "tbl_account" ADD COLUMN     "flags" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tbl_player" ADD COLUMN     "flags" INTEGER NOT NULL DEFAULT 0;
