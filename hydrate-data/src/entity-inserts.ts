import { PrismaClient } from "@prisma/client";
import { entities } from "./data/entity-data.js";

const prisma = new PrismaClient();

async function main() {
  console.log(entities.length);

  for (const entity of entities) {
    const hydrateEntities = await prisma.entity.create({
      data: {
        id: entity.id,
        bggid: entity.bggid,
        name: entity.name,
      },
    });
    console.log(hydrateEntities.id);
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
