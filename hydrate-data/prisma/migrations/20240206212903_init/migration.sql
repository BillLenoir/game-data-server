/*
  Warnings:

  - The primary key for the `Entity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Entity` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `EntityGameRelationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `entityid` on the `EntityGameRelationship` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
CREATE TABLE "new_EntityGameRelationship" (
    "entityid" INTEGER NOT NULL,
    "gameid" INTEGER NOT NULL,
    "relationship" TEXT NOT NULL,

    PRIMARY KEY ("entityid", "gameid"),
    CONSTRAINT "EntityGameRelationship_entityid_fkey" FOREIGN KEY ("entityid") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EntityGameRelationship_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "GameCombo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EntityGameRelationship" ("entityid", "gameid", "relationship") SELECT "entityid", "gameid", "relationship" FROM "EntityGameRelationship";
DROP TABLE "EntityGameRelationship";
ALTER TABLE "new_EntityGameRelationship" RENAME TO "EntityGameRelationship";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
