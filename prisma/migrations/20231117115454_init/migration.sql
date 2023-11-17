-- CreateTable
CREATE TABLE "tbl_account" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_account_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "tbl_player" (
    "id" SERIAL NOT NULL,
    "fk_account" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL DEFAULT 0,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_playervariable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tbl_playervariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_playerdata" (
    "player_id" INTEGER NOT NULL,
    "variable_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "tbl_playerdata_pkey" PRIMARY KEY ("player_id","variable_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_account_email_key" ON "tbl_account"("email");

-- AddForeignKey
ALTER TABLE "tbl_player" ADD CONSTRAINT "tbl_player_fk_account_fkey" FOREIGN KEY ("fk_account") REFERENCES "tbl_account"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_playerdata" ADD CONSTRAINT "tbl_playerdata_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "tbl_player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_playerdata" ADD CONSTRAINT "tbl_playerdata_variable_id_fkey" FOREIGN KEY ("variable_id") REFERENCES "tbl_playervariable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
