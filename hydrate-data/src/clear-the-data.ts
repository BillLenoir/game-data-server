import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deleteGameOnly = await prisma.gameOnly.deleteMany({});
  console.log(deleteGameOnly);

  const deleteRelationships = await prisma.entityGameRelationship.deleteMany(
    {},
  );
  console.log(deleteRelationships);

  const deleteGameCombo = await prisma.gameCombo.deleteMany({});
  console.log(deleteGameCombo);

  const deleteEntities = await prisma.entity.deleteMany({});
  console.log(deleteEntities);
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
