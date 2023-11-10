-- CreateTable
CREATE TABLE "Players_variables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Players_variables_id_key" ON "Players_variables"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Players_variables_name_key" ON "Players_variables"("name");
