-- DropForeignKey
ALTER TABLE "Players_vdata" DROP CONSTRAINT "Players_vdata_playerId_fkey";

-- AddForeignKey
ALTER TABLE "Players_vdata" ADD CONSTRAINT "Players_vdata_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
