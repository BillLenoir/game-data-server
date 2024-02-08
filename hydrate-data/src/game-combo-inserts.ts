import { PrismaClient } from "@prisma/client";
import { gamesCombo } from "./data/game-combo-data.js";

const prisma = new PrismaClient();

async function main() {
  for (const game of gamesCombo) {
    const hydrateGamesCombo = await prisma.gameCombo.create({
      data: {
        id: game.id,
        bggid: game.bggid,
        title: game.title,
        yearpublished: game.yearpublished,
        thumbnail: game.thumbnail,
        description: game.description,
        gameown: game.gameown,
        gamewanttobuy: game.gamewanttobuy,
        gameprevowned: game.gameprevowned,
        gamefortrade: game.gamefortrade,
      },
    });
    console.log(hydrateGamesCombo.title);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
