/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameOnly" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "yearpublished" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "publisher" TEXT NOT NULL,
    "designer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gameown" BOOLEAN NOT NULL,
    "gamewanttobuy" BOOLEAN NOT NULL,
    "gameprevowned" BOOLEAN NOT NULL,
    "gamefortrade" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "GameCombo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bggid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "yearpublished" TEXT,
    "thumbnail" TEXT,
    "description" TEXT NOT NULL,
    "gameown" BOOLEAN NOT NULL,
    "gamewanttobuy" BOOLEAN NOT NULL,
    "gameprevowned" BOOLEAN NOT NULL,
    "gamefortrade" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bggid" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EntityGameRelationship" (
    "entityid" INTEGER NOT NULL,
    "gameid" INTEGER NOT NULL,
    "relationship" TEXT NOT NULL,

    PRIMARY KEY ("entityid", "gameid"),
    CONSTRAINT "EntityGameRelationship_entityid_fkey" FOREIGN KEY ("entityid") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EntityGameRelationship_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "GameCombo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_bggid_key" ON "Entity"("bggid");
