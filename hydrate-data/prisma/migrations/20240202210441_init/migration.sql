/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `yearpublished` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
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
INSERT INTO "new_User" ("description", "designer", "gamefortrade", "gameown", "gameprevowned", "gamewanttobuy", "id", "publisher", "thumbnail", "title", "yearpublished") SELECT "description", "designer", "gamefortrade", "gameown", "gameprevowned", "gamewanttobuy", "id", "publisher", "thumbnail", "title", "yearpublished" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
