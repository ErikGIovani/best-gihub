import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const Users = await prisma.user.createMany({
    data: [
      {
        username: "ErikGIovani",
        name: "Erik Giovani",
        url: "https://github.com/ErikGIovani",
        avatar: "https://avatars.githubusercontent.com/u/46170949?v=4",
        total: 35,
      }, // Agregar dos perfiles mas
    ],
  });

  console.log(Users);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
