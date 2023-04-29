import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usersCall = async () => {
  const users = await prisma.user.findMany();
  const usersOrdered = users.sort((a, b) => b.total - a.total);
  return usersOrdered;
};

export default usersCall;
