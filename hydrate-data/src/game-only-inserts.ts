import { PrismaClient } from "@prisma/client";
import { games } from "./data/GameOnlyData.js";

const prisma = new PrismaClient();

async function main() {
  for (const game of games) {
    const publisher = game.publisher.join();
    const designer = game.designer.join();
    const hydrateGameOnly = await prisma.gameOnly.create({
      data: {
        id: game.id,
        title: game.title,
        yearpublished: game.yearpublished,
        thumbnail: game.thumbnail,
        publisher: publisher,
        designer: designer,
        description: game.description,
        gameown: game.gameown,
        gamewanttobuy: game.gamewanttobuy,
        gameprevowned: game.gameprevowned,
        gamefortrade: game.gamefortrade,
      },
    });
    console.log(hydrateGameOnly);
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
