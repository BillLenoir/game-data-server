/*
  Warnings:

  - A unique constraint covering the columns `[bggid]` on the table `GameCombo` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bggid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Entity" ("bggid", "id", "name") SELECT "bggid", "id", "name" FROM "Entity";
DROP TABLE "Entity";
ALTER TABLE "new_Entity" RENAME TO "Entity";
CREATE UNIQUE INDEX "Entity_bggid_key" ON "Entity"("bggid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "GameCombo_bggid_key" ON "GameCombo"("bggid");
