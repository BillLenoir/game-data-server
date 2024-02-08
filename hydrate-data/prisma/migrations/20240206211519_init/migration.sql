/*
  Warnings:

  - You are about to alter the column `yearpublished` on the `GameCombo` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `yearpublished` on table `GameCombo` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameCombo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bggid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "yearpublished" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "description" TEXT NOT NULL,
    "gameown" BOOLEAN NOT NULL,
    "gamewanttobuy" BOOLEAN NOT NULL,
    "gameprevowned" BOOLEAN NOT NULL,
    "gamefortrade" BOOLEAN NOT NULL
);
INSERT INTO "new_GameCombo" ("bggid", "description", "gamefortrade", "gameown", "gameprevowned", "gamewanttobuy", "id", "thumbnail", "title", "yearpublished") SELECT "bggid", "description", "gamefortrade", "gameown", "gameprevowned", "gamewanttobuy", "id", "thumbnail", "title", "yearpublished" FROM "GameCombo";
DROP TABLE "GameCombo";
ALTER TABLE "new_GameCombo" RENAME TO "GameCombo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
