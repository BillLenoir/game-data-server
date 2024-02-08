/*
  Warnings:

  - The primary key for the `Entity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EntityGameRelationship` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bggid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Entity" ("bggid", "id", "name") SELECT "bggid", "id", "name" FROM "Entity";
DROP TABLE "Entity";
ALTER TABLE "new_Entity" RENAME TO "Entity";
CREATE UNIQUE INDEX "Entity_bggid_key" ON "Entity"("bggid");
CREATE TABLE "new_EntityGameRelationship" (
    "entityid" TEXT NOT NULL,
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
