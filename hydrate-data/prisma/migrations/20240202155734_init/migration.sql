-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "yearpublished" TEXT NOT NULL,
    "thumbnail" TEXT,
    "publisher" TEXT NOT NULL,
    "designer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gameown" BOOLEAN NOT NULL,
    "gamewanttobuy" BOOLEAN NOT NULL,
    "gameprevowned" BOOLEAN NOT NULL,
    "gamefortrade" BOOLEAN NOT NULL
);
