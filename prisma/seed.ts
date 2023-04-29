import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  const Users = await prisma.user.createMany({
    data: [
      {
        username: "ErikGIovani",
        name: "Erik Giovani",
        url: "https://github.com/ErikGIovani",
        avatar: "https://avatars.githubusercontent.com/u/46170949?v=4",
        total: 35,
      },
      {
        username: "Dino",
        name: "Dino Picapiedra",
        url: "https://github.com/ErikGIovani",
        avatar: "https://avatars.githubusercontent.com/u/46170949?v=4",
        total: 40,
      },
      {
        username: "Pablo",
        name: "Pablo Marmol",
        url: "https://github.com/ErikGIovani",
        avatar: "https://avatars.githubusercontent.com/u/46170949?v=4",
        total: 16,
      }, // TODO: Add two more profiles.
    ],
  });

  console.log(Users);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
