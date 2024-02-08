import { PrismaClient } from "@prisma/client";
import { relationships } from "./data/relationship-data.js";

const prisma = new PrismaClient();

async function main() {
  for (const relationship of relationships) {
    console.log(relationship);
    const hydrateRelationships = await prisma.entityGameRelationship.create({
      data: {
        gameid: relationship.gameid,
        entityid: relationship.entityid,
        relationship: relationship.relationshiptype,
      },
    });
    console.log(hydrateRelationships);
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
