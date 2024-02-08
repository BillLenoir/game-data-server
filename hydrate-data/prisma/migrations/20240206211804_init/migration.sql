-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameCombo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bggid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "yearpublished" TEXT,
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
